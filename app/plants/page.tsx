import InventoryTable from "@/components/InventoryTable";
import { stackServerApp } from "@/stack";
import { SignUp } from "@stackframe/stack";
import { getPlants } from "../actions/plant.action";
import { Suspense } from "react";
<<<<<<< HEAD
=======

// Force dynamic rendering for this page since it uses cookies
export const dynamic = 'force-dynamic';
export const revalidate = 0;
>>>>>>> parent of be22a4f (update)

<<<<<<< HEAD
<<<<<<< HEAD
// Force dynamic rendering for this page since it uses cookies
export const dynamic = 'force-dynamic';

=======
>>>>>>> parent of b4498f2 (fix: error handling)
=======
>>>>>>> parent of b4498f2 (fix: error handling)
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  // Early return for build time
  if (process.env.NODE_ENV === "production" && !process.env.DATABASE_URL) {
=======
  // Early return for build time
  if (process.env.NODE_ENV === "production" && !process.env.DATABASE_URL) {
    return (
      <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
        <div className="lg:col-span-full">
          <div className="text-center py-10">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Loading Plants...
            </h1>
            <p className="text-gray-600">
              Please wait while we load your plant inventory.
            </p>
          </div>
        </div>
      </div>
    );
  }

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
>>>>>>> parent of be22a4f (update)
    return (
      <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
        <div className="lg:col-span-full">
          <div className="text-center py-10">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Loading Plants...
            </h1>
            <p className="text-gray-600">
              Please wait while we load your plant inventory.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

<<<<<<< HEAD
=======
>>>>>>> parent of 09ed042 (fix : error)
  try {
    const user = await stackServerApp.getUser();
=======
  const user = await stackServerApp.getUser();
>>>>>>> parent of b4498f2 (fix: error handling)
=======
  const user = await stackServerApp.getUser();
>>>>>>> parent of b4498f2 (fix: error handling)

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
  const plants = await getPlants();
  
  return (
    <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-full">
        <InventoryTable plants={plants} loading={false} />
      </div>
    </div>
  );
=======
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
>>>>>>> parent of be22a4f (update)
}
