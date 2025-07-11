"use client";

import { useEffect, useState } from "react";
import InventoryTable from "@/components/InventoryTable";
import { SignUp } from "@stackframe/stack";
import { getPlants } from "../actions/plant.action";

function PlantsTableSkeleton() {
  return (
    <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-full">
        <InventoryTable loading={true} />
      </div>
    </div>
  );
}

export default function Plants() {
  const [user, setUser] = useState<any>(null);
  const [plants, setPlants] = useState<any>(null);
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
          const plantsData = await getPlants();
          setPlants(plantsData);
        }
      } catch (err) {
        console.error("Error loading data:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return <PlantsTableSkeleton />;
  }

  if (error) {
    return (
      <div className="flex justify-center mt-16 items-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Service Temporarily Unavailable
          </h1>
          <p className="text-gray-600">
            We're experiencing some technical difficulties. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center mt-16 items-center">
        <SignUp />
      </div>
    );
  }

  return (
    <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-full">
        <InventoryTable plants={plants} loading={false} />
      </div>
    </div>
  );
}
