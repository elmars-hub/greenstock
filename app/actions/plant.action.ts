"use server";

import { getUserId } from "./user.action";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { isBuildEnvironment, safeDatabaseOperation } from "@/lib/utils";

export async function getPlants(searchTerm?: string) {
  return safeDatabaseOperation(
    async () => {
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
    },
    { success: true, userPlants: [] }
  );
}

export async function getPlantsById(id: string) {
  if (!id) {
    console.error("No ID provided to getPlantsById");
    return null;
  }

  return safeDatabaseOperation(
    async () => {
      const plant = await prisma.plants.findUnique({
        where: { id },
      });

      return plant;
    },
    null
  );
}

export async function editPlant(id: string, data: Prisma.PlantsUpdateInput) {
  return safeDatabaseOperation(
    async () => {
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
    },
    null
  );
}

export async function deletePlant(id: string) {
  return safeDatabaseOperation(
    async () => {
      const currentUserId = await getUserId();
      if (!currentUserId) return;

      const deletedProduct = await prisma.plants.delete({
        where: { id },
      });

      revalidatePath("/plants");
      return deletedProduct;
    },
    null
  );
}
