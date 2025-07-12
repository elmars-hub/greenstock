import PlantCard from "./PlantCard";
import { getPlantsById } from "@/app/actions/plant.action";
import { SignIn } from "@stackframe/stack";
import { stackServerApp } from "@/stack";
import { safePlantMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  // During build time, return default metadata to prevent build failures
  if (process.env.NODE_ENV === "production" && !process.env.DATABASE_URL) {
    return safePlantMetadata();
  }

  try {
    const [id] = params.slug.split("--");
    const plant = await getPlantsById(id);

    if (!plant) {
      return safePlantMetadata();
    }

    return safePlantMetadata(
      `${plant.name} | Plant Details`,
      plant.description ??
        `Learn more about ${plant.name} and its care requirements.`
    );
  } catch (error) {
    console.error("Error generating metadata:", error);
    return safePlantMetadata();
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  try {
    // Safely get user without failing the build
    let user = null;
    try {
      user = await stackServerApp.getUser();
    } catch (stackError) {
      console.error("Stack authentication error:", stackError);
    }

    const [id] = params.slug.split("--");

    // Safely get plant data
    let plant = null;
    try {
      plant = await getPlantsById(id);
    } catch (dbError) {
      console.error("Database error:", dbError);
    }

    // If no user, show sign in
    if (!user) {
      return <SignIn />;
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
            Error Loading Plant
          </h1>
          <p className="text-gray-600">
            Unable to load plant details. Please try again later.
          </p>
        </div>
      </div>
    );
  }
}
