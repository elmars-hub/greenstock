import React from "react";
import PlantCard from "./PlantCard";
import { getPlantsById } from "@/app/actions/plant.action";
import { SignIn } from "@stackframe/stack";
import { stackServerApp } from "@/stack";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const [id] = params.slug.split("--");
    const plant = await getPlantsById(id);

    return {
      title: plant?.name || "Plant Details",
      description: plant?.description || "Plant details page",
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Plant Details",
      description: "Plant details page",
    };
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  try {
    let user;
    try {
      user = await stackServerApp.getUser();
    } catch (stackError) {
      console.error("Stack authentication error:", stackError);
      user = null;
    }

    const [id] = params.slug.split("--");
    const plant = await getPlantsById(id);

    if (!user) {
      return <SignIn />;
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
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Plant</h1>
          <p className="text-gray-600">Unable to load plant details. Please try again later.</p>
        </div>
      </div>
    );
  }
}
