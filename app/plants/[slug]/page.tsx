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
  const [id] = params.slug.split("--");
  const plant = await getPlantsById(id);

  return {
    title: plant?.name || "Plant Details",
    description: plant?.description || "Plant details page",
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const user = await stackServerApp.getUser();
  const [id] = params.slug.split("--");
  const plant = await getPlantsById(id);

  if (!user) {
    return <SignIn />;
  }

  return (
    <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-full">
        {plant ? <PlantCard plant={plant} /> : <p>Plant not found.</p>}
      </div>
    </div>
  );
}
