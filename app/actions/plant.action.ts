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

    // New check: Explicitly skip database calls if in a Vercel build environment.
    // process.env.VERCEL_ENV will be 'production' or 'preview' on Vercel,
    // and process.env.NODE_ENV will be 'production'.
    // This condition aims to catch the build phase where direct DB access might be restricted.
    const isVercelBuild =
      process.env.VERCEL_ENV && process.env.NODE_ENV === "production";

    if (isVercelBuild) {
      console.warn(
        "Detected Vercel build environment. Skipping database call for getPlantsById to prevent build failure due to network restrictions."
      );
      return null; // Crucial: Return null to allow the build to proceed.
    }

    // The original check for DATABASE_URL is still useful for other environments
    // or if DATABASE_URL is genuinely missing for some reason.
    if (!process.env.DATABASE_URL) {
      console.warn(
        "DATABASE_URL not available. Skipping database call for getPlantsById."
      );
      return null;
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
