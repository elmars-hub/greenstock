import PlantCard from "./PlantCard";
import { getPlantsById } from "@/app/actions/plant.action";
import { SignIn } from "@stackframe/stack";
import { stackServerApp } from "@/stack";
import { isBuildEnvironment } from "@/lib/utils";

// Force this page to be dynamic and not statically generated
export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

// Disable static generation for this route
export const generateStaticParams = () => {
  return [];
};

export default async function Page({ params }: { params: { slug: string } }) {
  // Early return during build time
  if (isBuildEnvironment()) {
    return (
      <div className="mt-7 max-w-7xl mx-auto px-4">
        <div className="text-center py-10">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  try {
    let user = null;
    try {
      user = await stackServerApp.getUser();
    } catch (stackError) {
      console.error("Stack authentication error:", stackError);
    }

    const [id] = params.slug.split("--");

    // If no user, show sign in
    if (!user) {
      return <SignIn />;
    }

    // Safely get plant data
    let plant = null;
    try {
      plant = await getPlantsById(id);
    } catch (dbError) {
      console.error("Database error:", dbError);
    }

    // If no plant found, show error
    if (!plant) {
      return (
        <div className="mt-7 max-w-7xl mx-auto px-4">
          <div className="text-center py-10">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Plant Not Found
            </h1>
            <p className="text-gray-600">
              The plant you are looking for does not exist or has been removed.
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
            Error Loading Plants
          </h1>
          <p className="text-gray-600">
            Unable to load plant details. Please try again later.
          </p>
        </div>
      </div>
    );
  }
}
