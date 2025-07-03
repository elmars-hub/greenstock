import { InventoryTable } from "@/components/InventoryTable";
import { stackServerApp } from "@/stack";
import { SignUp } from "@stackframe/stack";

export default async function Plants() {
  const user = await stackServerApp.getUser();
  const app = stackServerApp.urls;

  return (
    <>
      {user ? (
        <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
          <div className="lg:col-span-full">
            <InventoryTable />
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-16 items-center">
          <SignUp />
        </div>
      )}
    </>
  );
}
