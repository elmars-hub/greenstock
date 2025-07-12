import PlantCard from "./PlantCard";
import { getPlantsById } from "@/app/actions/plant.action";
import { SignIn } from "@stackframe/stack";
import { stackServerApp } from "@/stack";
// import { safePlantMetadata } from "@/lib/metadata";
// import type { Metadata } from "next";

export const dynamic = "force-dynamic";

// export async function generateMetadata({
//   params,
// }: {
//   params: { slug: string };
// }): Promise<Metadata> {
//   // During build, return basic metadata
//   if (
//     !process.env.DATABASE_URL ||
//     (process.env.NODE_ENV === "production" && !process.env.VERCEL_ENV)
//   ) {
//     const [id] = params.slug.split("--");
//     return safePlantMetadata(
//       `Plant ${id} | Plant Care Guide`,
//       `Complete care guide and growing tips for plant ${id}. Learn about watering, lighting, and maintenance.`
//     );
//   }

//   try {
//     // Only attempt database call in runtime environments
//     const [id] = params.slug.split("--");

//     // Add timeout protection
//     const timeoutPromise = new Promise<null>((_, reject) => {
//       setTimeout(() => reject(new Error("Timeout")), 2000);
//     });

//     const plant = await Promise.race([getPlantsById(id), timeoutPromise]);

//     if (plant) {
//       return safePlantMetadata(
//         `${plant.name} | Plant Care Guide`,
//         plant.description ??
//           `Complete care guide for ${plant.name}. Learn about watering, lighting, and growing tips.`
//       );
//     }

//     // Fallback with slug info
//     return safePlantMetadata(
//       `Plant ${id} | Plant Care Guide`,
//       `Complete care guide and growing tips for plant ${id}.`
//     );
//   } catch (error) {
//     console.error("Error generating metadata:", error);
//     const [id] = params.slug.split("--");
//     return safePlantMetadata(
//       `Plant ${id} | Plant Care Guide`,
//       `Complete care guide and growing tips for plant ${id}.`
//     );
//   }
// }

export default async function Page({ params }: { params: { slug: string } }) {
  try {
    let user = null;
    try {
      user = await stackServerApp.getUser();
    } catch (stackError) {
      console.error("Stack authentication error:", stackError);
      // During build, return a placeholder
      if (
        process.env.VERCEL_ENV === undefined &&
        process.env.NODE_ENV !== "development"
      ) {
        return <div>Loading...</div>;
      }
    }

    const [id] = params.slug.split("--");

    // Safely get plant data
    let plant = null;
    try {
      plant = await getPlantsById(id);
    } catch (dbError) {
      console.error("Database error:", dbError);
      // During build, return a placeholder
      if (
        process.env.VERCEL_ENV === undefined &&
        process.env.NODE_ENV !== "development"
      ) {
        return <div>Loading...</div>;
      }
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
