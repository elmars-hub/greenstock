import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility function to detect if we're in a build environment
export function isBuildEnvironment(): boolean {
  // Check for various build environment indicators
  const isVercelBuild = process.env.VERCEL_ENV === "production" && !process.env.DATABASE_URL;
  const isLocalBuild = process.env.NODE_ENV === "production" && !process.env.VERCEL_ENV && !process.env.VERCEL_URL;
  const isNetlifyBuild = process.env.NETLIFY === "true";
  const isRailwayBuild = process.env.RAILWAY_ENVIRONMENT === "production" && !process.env.DATABASE_URL;
  
  return isVercelBuild || isLocalBuild || isNetlifyBuild || isRailwayBuild;
}

// Utility function to safely execute database operations
export async function safeDatabaseOperation<T>(
  operation: () => Promise<T>,
  fallback: T
): Promise<T> {
  if (isBuildEnvironment()) {
    console.log("Build environment detected, skipping database operation");
    return fallback;
  }

  try {
    return await operation();
  } catch (error) {
    console.error("Database operation failed:", error);
    return fallback;
  }
}
