import { getPlantsById } from "@/app/actions/plant.action";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

type Plant = Awaited<ReturnType<typeof getPlantsById>>;

interface PlantCardProps {
  plant: Plant;
}

export default function PlantCard({ plant }: PlantCardProps) {
  if (!plant) {
    return <div className="">Plant data is not available</div>;
  }

  return (
    <Card className="w-full max-w-5xl mx-auto">
      <div className="flex flex-col lg:flex-row">
        {/* Image Section */}
        <div className="w-full lg:w-1/2">
          <CardHeader className="p-4 lg:p-6">
            {plant.imageUrl && (
              <div className="rounded-lg overflow-hidden">
                <Image
                  src={plant.imageUrl}
                  alt={`${plant.name} plant`}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover aspect-video"
                  priority
                />
              </div>
            )}
          </CardHeader>
        </div>

        {/* Content Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between">
          <CardContent className="px-3 lg:p-6 space-y-4 lg:space-y-6">
            <div className="space-y-2">
              <CardTitle className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                {plant.name}
              </CardTitle>
              <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600">
                ${plant.price}
              </CardTitle>
            </div>

            <div className="space-y-3">
              <Badge className="text-sm px-3 py-1">{plant.category}</Badge>
              <CardDescription className="text-base">
                Stock: {plant.stock} units
              </CardDescription>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-dark">Description</h3>
              <CardDescription className="text-sm sm:text-base leading-relaxed text-gray-700 bg-gray-50 p-4 rounded-lg border-l-4 border-green-200">
                {plant.description}
              </CardDescription>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
