import InventoryTable from "@/components/InventoryTable";
import { stackServerApp } from "@/stack";
import { SignUp } from "@stackframe/stack";
import { getPlants } from "../actions/plant.action";
import { Suspense } from "react";

// Force dynamic rendering for this page since it uses cookies
export const dynamic = 'force-dynamic';

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
  try {
    const user = await stackServerApp.getUser();

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
  } catch (error) {
    console.error("Error in Plants component:", error);
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
      <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
        <div className="lg:col-span-full">
          <div className="text-center py-10">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Error Loading Plants
            </h1>
            <p className="text-gray-600">
              There was an error loading your plants. Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
