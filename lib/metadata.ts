import type { Metadata } from "next";

export function safePlantMetadata(
  title?: string,
  description?: string
): Metadata {
  return {
    title: title ?? "Plant Details | Your Plant App",
    description:
      description ??
      "Discover detailed plant care information and growing tips.",
  };
}
