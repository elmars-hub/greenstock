"use server";

import { getUserId } from "./user.action";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getPlants(searchTerm?: string) {
  try {
    const currentUser = await getUserId();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const whereClause: any = {
      userId: currentUser,
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
    console.log(error);
    throw new Error("Failed to fetch plant");
  }
}
