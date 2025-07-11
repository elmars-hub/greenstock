"use client";

import React, { useEffect, useState } from "react";
import PlantCard from "./PlantCard";
import { getPlantsById } from "@/app/actions/plant.action";
import { SignIn } from "@stackframe/stack";

export default function Page({ params }: { params: { slug: string } }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [plant, setPlant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        // Import stackServerApp dynamically to avoid SSR issues
        const { stackServerApp } = await import("@/stack");
        const currentUser = await stackServerApp.getUser();
        setUser(currentUser);

        if (currentUser) {
          const [id] = params.slug.split("--");
          const plantData = await getPlantsById(id);
          setPlant(plantData);
        }
      } catch (err) {
        console.error("Error loading data:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="mt-7 max-w-7xl mx-auto px-4">
        <div className="text-center py-10">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Loading...</h1>
          <p className="text-gray-600">
            Please wait while we load the plant details.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
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
}
