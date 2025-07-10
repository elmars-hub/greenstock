"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Combobox } from "./combo-box";
import { useState } from "react";
import type { getPlants } from "@/app/actions/plant.action";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

type Plant = Awaited<ReturnType<typeof getPlants>>;

interface InventoryTableProps {
  plants?: Plant;
  loading?: boolean;
}

export default function InventoryTable({
  plants,
  loading = false,
}: InventoryTableProps) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");

  if (loading) {
    return (
      <div className="w-full space-y-4">
        <div className="flex items-center justify-center py-4">
        
        </div>
        <div className="flex items-center gap-2 py-4">
          <div className="relative max-w-sm w-full">
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-10 w-[200px]" />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plant ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 6 }).map((_, index) => (
                <TableRow key={`skeleton-${index}`}>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-12" />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-4">
                      <Skeleton className="h-4 w-8" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  const filteredPlants = plants?.userPlants?.filter(
    (plant) =>
      plant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "" || plant.category === selectedCategory)
  );

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-2 py-4">
        <div className="relative max-w-sm w-full">
          <Input
            placeholder="Filter plants..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute h-4 w-4 left-3 top-1/2 transform -translate-y-1/2" />
        </div>
        <Combobox
          value={selectedCategory}
          onChange={(val) => setSelectedCategory(val)}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Plant ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPlants && filteredPlants.length > 0 ? (
            filteredPlants.map((plant) => {
              const slugifiedName = plant.name
                .toLowerCase()
                .replace(/\s+/g, "-");
              const slug = `${plant.id}--${slugifiedName}`;
              const plantUrl = `/plants/${slug}`;
              return (
                <TableRow key={plant.id} onClick={() => router.push(plantUrl)}>
                  <TableCell className="font-medium">{plant.id}</TableCell>
                  <TableCell>{plant.name}</TableCell>
                  <TableCell>{plant.category}</TableCell>
                  <TableCell>{plant.price}</TableCell>
                  <TableCell className="font-bold">{plant.stock}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-4">
                      <button className="text-blue-600 hover:underline">
                        Edit
                      </button>
                      <button className="text-red-600 hover:underline">
                        Delete
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                No plants found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
