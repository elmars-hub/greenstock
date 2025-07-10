"use server";

import { getUserId } from "./user.action";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getPlants(searchTerm?: string) {
  try {
    const currentUserId = await getUserId();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const whereClause: any = {
      userId: currentUserId,
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

export async function getPlantsById(id: string) {
  return await prisma.plants.findUnique({
    where: { id },
  });
}
