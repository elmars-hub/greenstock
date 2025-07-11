import Link from "next/link";
import { Separator } from "./ui/separator";
import {
  DribbbleIcon,
  GithubIcon,
  TwitchIcon,
  TwitterIcon,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full">
      <div className="w-full">
        <div className="grow bg-muted">
          <Separator />
          <div className="py-4 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-x-2 px-4 sm:px-6">
            <span className="text-muted-foreground text-sm sm:text-base text-center sm:text-left">
              &copy; {new Date().getFullYear()}{" "}
              <Link href="/" target="_blank" className="hover:underline">
                elmarshub
              </Link>
              . All rights reserved.
            </span>

            <div className="hidden md:flex items-center gap-4 sm:gap-5 text-muted-foreground">
              <Link
                href="#"
                target="_blank"
                className="hover:text-foreground transition-colors"
              >
                <TwitterIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link
                href="#"
                target="_blank"
                className="hover:text-foreground transition-colors"
              >
                <DribbbleIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link
                href="#"
                target="_blank"
                className="hover:text-foreground transition-colors"
              >
                <TwitchIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link
                href="#"
                target="_blank"
                className="hover:text-foreground transition-colors"
              >
                <GithubIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
