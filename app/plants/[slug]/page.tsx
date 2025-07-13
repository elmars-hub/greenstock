// app/plants/[slug]/page.tsx
import PlantCard from "./PlantCard";
import { getPlantsById } from "@/app/actions/plant.action";
import { SignIn } from "@stackframe/stack";
import { stackServerApp } from "@/stack";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

export default async function Page({ params }: { params: { slug: string } }) {
  let user = null;
  let plant = null;
  const [id] = params.slug.split("--");

  // Determine if we are likely in a Vercel build environment where external services might not be fully active.
  // We use DATABASE_URL as a proxy: if it's not set, we assume it's a build environment or misconfiguration.
  const isBuildEnvironment = !process.env.DATABASE_URL;

  try {
    // Attempt to get user. If it fails (e.g., during build without proper auth setup),
    // we should handle it gracefully without crashing the build.
    if (isBuildEnvironment) {
      console.log("Skipping Stack authentication during build environment.");
      user = null; // Assume no user during build to prevent crashes
    } else {
      user = await stackServerApp.getUser();
    }
  } catch (stackError) {
    console.error("Stack authentication error during page load:", stackError);
    if (isBuildEnvironment) {
      console.log(
        "Auth failed during build-like environment. Proceeding without user."
      );
      user = null; // Ensure user is null if auth fails during build
    } else {
      // If not a build environment, re-throw the error for runtime debugging.
      throw stackError;
    }
  }

  try {
    // getPlantsById already has a check for DATABASE_URL, which aligns with isBuildEnvironment.
    // If DATABASE_URL is not set (common during build), it will return null.
    plant = await getPlantsById(id);
  } catch (dbError) {
    console.error("Database error during page load:", dbError);
    if (isBuildEnvironment) {
      console.log(
        "DB call failed during build-like environment. Proceeding without plant data."
      );
      plant = null; // Ensure plant is null if DB call fails during build
    } else {
      // If not a build environment, re-throw the error for runtime debugging.
      throw dbError;
    }
  }

  // If `isBuildEnvironment` is true and we've skipped external calls,
  // we need to ensure the component renders something valid to prevent build errors.
  // Returning SignIn or a "Plant Not Found" message is fine, as long as it doesn't crash.

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
}
