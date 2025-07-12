import type { Metadata } from "next";

export function safePlantMetadata(
  title?: string,
  description?: string
): Metadata {
  const defaultTitle = "Plant Care Guide | Your Plant App";
  const defaultDescription =
    "Discover comprehensive plant care information, growing tips, and maintenance guides for your favorite plants.";

  return {
    title: title ?? defaultTitle,
    description: description ?? defaultDescription,
    keywords: [
      "plants",
      "gardening",
      "plant care",
      "growing tips",
      "houseplants",
      "garden",
    ],

    alternates: {
      canonical: title
        ? `/plants/${title.toLowerCase().replace(/\s+/g, "-")}`
        : undefined,
    },
  };
}
