import InventoryTable from "@/components/InventoryTable";
import { stackServerApp } from "@/stack";
import { SignUp } from "@stackframe/stack";
import { getPlants } from "../actions/plant.action";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

// Disable static generation for this route
export const generateStaticParams = () => {
  return [];
};

function PlantsTableSkeleton() {
  return (
    <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-full">
        <InventoryTable loading={true} />
      </div>
    </div>
  );
}

export default async function Plants() {
  // Early return during build time
  if (process.env.NODE_ENV === "production" && !process.env.VERCEL_ENV) {
    return (
      <div className="mt-7 max-w-7xl mx-auto px-4">
        <div className="text-center py-10">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  let user = null;
  try {
    user = await stackServerApp.getUser();
  } catch (error) {
    console.error("Error getting user:", error);
  }

  return (
    <>
      {user ? (
        <Suspense fallback={<PlantsTableSkeleton />}>
          <PlantsContent />
        </Suspense>
      ) : (
        <div className="flex justify-center mt-16 items-center">
          <SignUp />
        </div>
      )}
    </>
  );
}

async function PlantsContent() {
  try {
    const plants = await getPlants();

    return (
      <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
        <div className="lg:col-span-full">
          <InventoryTable plants={plants} loading={false} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading plants:", error);
    return (
      <div className="mt-7 max-w-7xl mx-auto px-4">
        <div className="text-center py-10">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Plants</h1>
          <p className="text-gray-600">Unable to load plants. Please try again later.</p>
        </div>
      </div>
    );
  }
}
