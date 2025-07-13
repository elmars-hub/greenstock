// app/actions/plant.action.ts
"use server";

import { getUserId } from "./user.action";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function getPlants(searchTerm?: string) {
  try {
    // Note: getPlants is not directly called by the [slug] page, but if it were,
    // it would also need similar build-time handling if it's causing issues.
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
    console.error("Error in getPlants:", error); // Use console.error for errors
    throw new Error("Failed to fetch plant");
  }
}

export async function getPlantsById(id: string) {
  try {
    if (!id) {
      console.error("No ID provided to getPlantsById");
      return null;
    }

    // Check if DATABASE_URL is available. If not, it's likely a build environment
    // or a misconfiguration where we cannot connect to the database.
    if (!process.env.DATABASE_URL) {
      console.warn(
        "DATABASE_URL not available. Skipping database call for getPlantsById during build or misconfiguration."
      );
      return null; // Crucial: Return null to prevent build failure
    }

    const plant = await prisma.plants.findUnique({
      where: { id },
    });

    return plant;
  } catch (error) {
    console.error("Error fetching plant by ID:", error);
    // During build, returning null here allows the build to proceed.
    // During runtime, you might want to re-throw or handle differently.
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
