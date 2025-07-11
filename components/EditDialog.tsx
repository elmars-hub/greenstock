import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { EditIcon } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Combobox } from "./combo-box";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { editPlant, getPlantsById } from "@/app/actions/plant.action";
import ImageUpload from "./imageUpload";

type Plant = NonNullable<Awaited<ReturnType<typeof getPlantsById>>>;

interface EditDialogProps {
  plant: Plant;
}

export default function EditDialog({ plant }: EditDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: plant?.name.trim(),
    description: (plant?.description || "").trim(),
    price: plant?.price,
    category: plant?.category,
    imageUrl: plant?.imageUrl || "",
    stock: plant?.stock,
  });

  const handleChange = (field: string, value: string | number) => {
    // console.log(`Field changed: ${field}, New value: ${value}`);
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitForm();
  };

  const submitForm = async () => {
    setIsLoading(true);
    try {
      await editPlant(plant.id, {
        ...formData,
        price: Number(formData.price),
      });
      toast.success("Plant updated successfully!");
      setOpen(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to update plant. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleButtonClick = () => {
    submitForm();
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="default"
          className="ml-auto flex items-center gap-2"
          asChild
        >
          <span>
            <EditIcon className="w-4 h-4 cursor-pointer" />
          </span>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add a Plant</AlertDialogTitle>
          <AlertDialogDescription>
            Fill out the form below to add a new plant to your inventory.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Combobox
                value={formData.category}
                onChange={(val) => handleChange("category", val)}
              />
            </div>
          </div>

          <div className="mt-2">
            <Label htmlFor="description" className="mt-2">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Type your message here."
              rows={5}
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                min="0"
                placeholder="Enter amount"
                value={formData.stock}
                onChange={(e) =>
                  handleChange("stock", Number(e.target.value) || 0)
                }
              />
            </div>

            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                placeholder="Enter price"
                value={formData.price}
                onChange={(e) => handleChange("price", e.target.value)}
              />
            </div>
          </div>

          {/* Image Edit */}
          <div className="space-y-2">
            <Label>Image</Label>
            <ImageUpload
              endpoint="postImage"
              value={formData.imageUrl}
              onChange={(url) => {
                handleChange("imageUrl", url);
              }}
            />
          </div>

          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel className="cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <Button
              type="button"
              className="cursor-pointer"
              onClick={handleButtonClick}
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update"}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
