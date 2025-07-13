import React from "react";
import PlantCard from "./PlantCard";
import { getPlantsById } from "@/app/actions/plant.action";
import { SignIn } from "@stackframe/stack";
import { stackServerApp } from "@/stack";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const [id] = params.slug.split("--");
    const plant = await getPlantsById(id);
    const title = plant
      ? `${plant.name} - Greenstock`
      : "Plant Details - Greenstock";
    const description = plant
      ? plant.description ||
        `Explore ${plant.name} and its details on Greenstock.`
      : "Discover a wide variety of plants on Greenstock, your go-to source for green living.";

    return {
      title,
      description,
    };
  } catch {
    return {
      title: "Plant Details",
      description: "Plant details page",
    };
  }
}

async function Page({ params }: { params: { slug: string } }) {
  try {
    const user = await stackServerApp.getUser();
    const [id] = params.slug.split("--");
    const plant = await getPlantsById(id);

    if (!user) {
      return <SignIn />;
    }

    if (!plant) {
      return (
        <div className="mt-7 max-w-7xl mx-auto px-4">
          <div className="text-center py-10">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Plant Not Found
            </h1>
            <p className="text-gray-600">
              The plant you&apos;re looking for doesn&apos;t exist or has been
              removed.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
        <div className="lg:col-span-full">
          <PlantCard plant={plant} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading plant page:", error);
    return (
      <div className="mt-7 max-w-7xl mx-auto px-4">
        <div className="text-center py-10">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Error Loading Plant
          </h1>
          <p className="text-gray-600">
            There was an error loading the plant details. Please try again
            later.
          </p>
        </div>
      </div>
    );
  }
}

export default Page;
