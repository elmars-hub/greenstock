"use server";

import { getUserId } from "./user.action";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function getPlants(searchTerm?: string) {
  try {
    // Skip database calls during build time
    if (process.env.NODE_ENV === "production" && !process.env.VERCEL_ENV) {
      console.log("Build environment detected, skipping database call for getPlants");
      return { success: true, userPlants: [] };
    }

    // Check if database URL is available
    if (!process.env.DATABASE_URL) {
      console.error("DATABASE_URL not available");
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
    });

    revalidatePath("/");
    return { success: true, userPlants };
  } catch (error) {
    console.log(error);
    return { success: true, userPlants: [] };
  }
}

export async function getPlantsById(id: string) {
  try {
    if (!id) {
      console.error("No ID provided to getPlantsById");
      return null;
    }

    // Skip database calls during build time
    if (process.env.NODE_ENV === "production" && !process.env.VERCEL_ENV) {
      console.log("Build environment detected, skipping database call for getPlantsById");
      return null;
    }

    // Check if database URL is available
    if (!process.env.DATABASE_URL) {
      console.error("DATABASE_URL not available");
      return null;
    }

    const plant = await prisma.plants.findUnique({
      where: { id },
    });

    return plant;
  } catch (error) {
    console.error("Error fetching plant by ID:", error);
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
