import React from "react";
import PlantCard from "./PlantCard";
import { getPlantsById } from "@/app/actions/plant.action";
import { SignIn } from "@stackframe/stack";
import { stackServerApp } from "@/stack";

<<<<<<< HEAD
<<<<<<< HEAD
export default function Page({ params }: { params: { slug: string } }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [plant, setPlant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
=======
// Force dynamic rendering for this route
export const dynamic = "force-dynamic";
export const revalidate = 0;
>>>>>>> parent of be22a4f (update)

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const [id] = params.slug.split("--");
    const plant = await getPlantsById(id);

<<<<<<< HEAD
<<<<<<< HEAD
        if (currentUser) {
          const [id] = params.slug.split("--");
          const plantData = await getPlantsById(id);
          setPlant(plantData);
        }
      } catch (err) {
        console.error("Error loading data:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [params.slug]);
=======
    return {
      title: plant ? plant.name : "Plant Details",
      description: plant
        ? plant.description || "Plant details page"
        : "Plant details page",
    };
  } catch {
    return {
      title: "Plant Details",
      description: "Plant details page",
    };
  }
}

async function Page({ params }: { params: { slug: string } }) {
  try {
    const user = await stackServerApp.getUser();
    const [id] = params.slug.split("--");
    const plant = await getPlantsById(id);

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
              The plant you&apos;re looking for doesn&apos;t exist or has been
              removed.
            </p>
          </div>
        </div>
      );
    }
>>>>>>> parent of f4dddc2 (fix)

  if (loading) {
=======
    return {
      title: plant ? plant.name : "Plant Details",
      description: plant
        ? plant.description || "Plant details page"
        : "Plant details page",
    };
  } catch {
    return {
      title: "Plant Details",
      description: "Plant details page",
    };
  }
}

async function Page({ params }: { params: { slug: string } }) {
  // Early return for build time
  if (process.env.NODE_ENV === "production" && !process.env.DATABASE_URL) {
>>>>>>> parent of be22a4f (update)
    return (
      <div className="mt-7 max-w-7xl mx-auto px-4">
        <div className="text-center py-10">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Loading...
          </h1>
          <p className="text-gray-600">
            Please wait while we load the plant details.
          </p>
        </div>
      </div>
    );
  }

  try {
    const user = await stackServerApp.getUser();
    const [id] = params.slug.split("--");
    const plant = await getPlantsById(id);

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
              The plant you&apos;re looking for doesn&apos;t exist or has been
              removed.
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
            There was an error loading the plant details. Please try again
            later.
          </p>
        </div>
      </div>
    );
  }
<<<<<<< HEAD
=======
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const [id] = params.slug.split("--");
  const plant = await getPlantsById(id);

  return {
    title: plant ? plant.name : "Plant Details",
    description: plant ? plant.description : "Plant details page ",
  };
}

async function Page({ params }: { params: { slug: string } }) {
  const user = await stackServerApp.getUser();
  const [id] = params.slug.split("--");
  const plant = await getPlantsById(id);

  if (!user) {
    return <SignIn />;
  }

  return (
    <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-full">
        <PlantCard plant={plant} />
      </div>
    </div>
  );
}
>>>>>>> parent of eef9f1e (fix: build errors)

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
            The plant you&apos;re looking for doesn&apos;t exist or has been
            removed.
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
=======
>>>>>>> parent of be22a4f (update)
}

export default Page;
