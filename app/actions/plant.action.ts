"use server";

import { prisma } from "@/lib/prisma";
import { getUserId } from "./user.action";
import { revalidatePath } from "next/cache";

type Props = {
  userId: string | undefined;
  name?: {
    contains: string;
    mode: "insensitive";
  };
};

export async function getPlants(searchTerm?: string) {
  try {
    const currentUser: string | undefined | null = await getUserId();

    const whereClause: Props = {
      userId:
        typeof currentUser === "string"
          ? currentUser
          : currentUser
          ? String(currentUser)
          : undefined,
    };

    if (searchTerm) {
      whereClause.name = {
        contains: searchTerm,
        mode: "insensitive",
      };
    }

    const userPlants = await prisma.plants.findMany({
      where: whereClause,
    });

    revalidatePath("/");
    return { success: true, userPlants };
  } catch (error) {
    console.log("error in getPlants", error);
    throw new Error("Failed to fetch plants");
  }
}
