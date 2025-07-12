"use server";

import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack";
import { neon } from "@neondatabase/serverless";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { isBuildEnvironment, safeDatabaseOperation } from "@/lib/utils";

export async function getUserDetails(userId: string | undefined) {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  if (!userId) {
    return null;
  }

  return safeDatabaseOperation(
    async () => {
      const sql = neon(process.env.DATABASE_URL!);
      const [user] =
        await sql`SELECT * FROM neon_auth.users_sync WHERE id = ${userId};`;
      return user;
    },
    null
  );
}

export async function getUserId() {
  if (isBuildEnvironment()) {
    console.log("Build environment detected, skipping getUserId");
    return undefined;
  }

  try {
    const user = await stackServerApp.getUser(); //get user details from neon
    const userId = user?.id;

    if (!userId) return;

    return userId;
  } catch (error) {
    console.error("Error getting user ID:", error);
    return undefined;
  }
}

type CreatePlantInput = Omit<Prisma.PlantsCreateInput, "userId">;

export async function createPlant(data: CreatePlantInput) {
  return safeDatabaseOperation(
    async () => {
      const currentUserId = await getUserId();
      if (!currentUserId) return;

      const newPlant = await prisma.plants.create({
        data: {
          ...data,
          userId: currentUserId,
        },
      });

      revalidatePath("/plants");
      return newPlant;
    },
    null
  );
}
