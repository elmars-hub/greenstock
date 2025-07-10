"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";


const plantCategories = [
  { value: "", label: "All Categories" },
  { value: "Indoor", label: "Indoor" },
  { value: "Outdoor", label: "Outdoor" },
  { value: "Succulent", label: "Succulent" },
  { value: "Flowering", label: "Flowering" },
  { value: "Herb", label: "Herb" },
  { value: "Fern", label: "Fern" },
  { value: "Tree", label: "Tree" },
  { value: "Shrub", label: "Shrub" },
];

interface ComboboxProps {
  value: string;
  onChange: (value: string) => void;
}

export function Combobox({ value, onChange }: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const selected = plantCategories.find((cat) => cat.value === value)?.label;
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className="w-[200px] justify-between cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {selected || "Select category..."}
        <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
      </Button>
      
      {open && (
        <div className="absolute top-full left-0 mt-1 w-[200px] bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <div className="p-4">
            {plantCategories.map((cat) => (
              <div
                key={cat.value}
                className="flex items-center space-x-2 p-2 hover:bg-gray-100 cursor-pointer rounded text-black"
                onClick={() => {
                  console.log("Category clicked:", cat.value);
                  onChange(cat.value);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === cat.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {cat.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
