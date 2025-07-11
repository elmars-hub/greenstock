import InventoryTable from "@/components/InventoryTable";
import { stackServerApp } from "@/stack";
import { SignUp } from "@stackframe/stack";
import { getPlants } from "../actions/plant.action";
import { Suspense } from "react";

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
}
