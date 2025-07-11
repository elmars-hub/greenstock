"use server";

import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { stackServerApp } from "@/stack";
import Link from "next/link";

async function Hero() {
  const user = await stackServerApp.getUser();
  const app = stackServerApp.urls;

  return (
    <section className="relative overflow-hidden py-16 bg-background text-foreground transition-colors">
      {/* Background pattern */}
      <div className="absolute inset-x-0 top-0 flex h-full w-full items-center justify-center opacity-100">
        <img
          alt="background"
          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/square-alt-grid.svg"
          className="opacity-90 [mask-image:radial-gradient(75%_75%_at_center,white,transparent)] dark:invert"
        />
      </div>

      <div className="relative z-10 container">
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <div className="flex flex-col items-center gap-6 text-center">
            {/* Logo Box */}
            <div className="rounded-xl bg-background/30 p-4 shadow-sm backdrop-blur-sm border border-border">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg"
                alt="logo"
                className="h-16 dark:invert"
              />
            </div>

            {/* Heading & Description */}
            <div>
              <h1 className="mb-6 text-2xl font-bold tracking-tight text-pretty lg:text-5xl leading-16">
                Manage and Save your plant discoveries with{" "}
                <span className="text-primary">GreenStock</span>
              </h1>
              <p className="mx-auto max-w-3xl text-muted-foreground lg:text-xl">
                Discover, organize, and keep track of all your favorite plants
                in one place. With GreenStock, managing your green collection
                has never been easier.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-center gap-3">
              {!user ? (
                <Button className="shadow-sm cursor-pointer transition-shadow hover:shadow bg-green-600   hover:bg-emerald-700 text-white ">
                  <Link href={app.signUp}>Sign Up Now</Link>
                </Button>
              ) : (
                <Button className="shadow-sm cursor-pointer transition-shadow hover:shadow bg-emerald-600 hover:bg-emerald-700 text-white ">
                  <Link href="/plants">Get Started</Link>
                </Button>
              )}

              <Button variant="outline" className="group">
                <Link href="/about">Learn more</Link>
                <ExternalLink className="ml-2 h-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </div>

            {/* Tech Logos */}
            <div className="mt-20 flex flex-col items-center gap-5">
              <p className="font-medium text-muted-foreground lg:text-left">
                Built with open-source technologies
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                {[
                  {
                    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcn-ui-icon.svg",
                    alt: "shadcn/ui",
                  },
                  {
                    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/typescript-icon.svg",
                    alt: "TypeScript",
                  },
                  {
                    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/react-icon.svg",
                    alt: "React",
                  },
                  {
                    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/tailwind-icon.svg",
                    alt: "Tailwind CSS",
                  },
                ].map((logo, index) => (
                  <a
                    key={index}
                    href="#"
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "group flex aspect-square h-12 items-center justify-center p-0"
                    )}
                  >
                    <img
                      src={logo.src}
                      alt={`${logo.alt} logo`}
                      className="h-6 saturate-0 transition-all group-hover:saturate-100 dark:invert"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { Hero };
