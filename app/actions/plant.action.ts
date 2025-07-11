"use server";

import { getUserId } from "./user.action";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function getPlants(searchTerm?: string) {
  try {
    // Check if we're in a build environment
    if (process.env.NODE_ENV === "production" && !process.env.DATABASE_URL) {
      console.warn("DATABASE_URL not available during build");
      return { success: true, userPlants: [] };
    }

    const currentUserId = await getUserId();

    if (!currentUserId) {
      return { success: true, userPlants: [] };
    }

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
      orderBy: {
        createdAt: 'desc',
      },
    });

    revalidatePath("/");
    return { success: true, userPlants };
  } catch (error) {
    console.error("Error in getPlants:", error);
    // Return empty array instead of throwing error to prevent build failures
    return { success: false, userPlants: [] };
  }
}

export async function getPlantsById(id: string) {
  try {
    // Check if we're in a build environment
    if (process.env.NODE_ENV === "production" && !process.env.DATABASE_URL) {
      console.warn("DATABASE_URL not available during build");
      return null;
    }

    const plant = await prisma.plants.findUnique({
      where: { id },
    });

    return plant;
  } catch (error) {
    console.error("Error in getPlantsById:", error);
    return null;
  }
}

export async function editPlant(id: string, data: Prisma.PlantsUpdateInput) {
  try {
    const currentUserId = await getUserId();
    const updatedPlant = await prisma.plants.update({
      where: { id },
      data: {
        ...data,
        userId: currentUserId,
      },
    });

    revalidatePath("/plants");
    return updatedPlant;
  } catch (error) {
    console.error("Error updating plant:", error);
    throw error;
  }
}

export async function deletePlant(id: string) {
  try {
    const currentUserId = await getUserId();
    if (!currentUserId) return;

    const deletedProduct = await prisma.plants.delete({
      where: { id },
    });

    revalidatePath("/plants");
    return deletedProduct;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}
