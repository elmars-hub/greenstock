import Link from "next/link";
import { Button } from "./ui/button";
import { Home, LogIn, LogOut, Sprout } from "lucide-react";
import Toogle from "./toogle";
import { stackServerApp } from "@/stack";
// import { getUserDetails } from "@/app/actions/user.action";
import { UserButton } from "@stackframe/stack";

export default async function Navbar() {
  const user = await stackServerApp.getUser();
  const app = stackServerApp.urls;
  //   const userProfile = await getUserDetails(user?.id);

  return (
    <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-4 ">
        <div className="flex items-center h-16 justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold text-primary font-mono tracking-wider"
            >
              🪴 GreenStock
            </Link>
          </div>

          {/* Navbar components */}
          {/* {userProfile?.name && (
            <span className="text-[14px] text-gray-600 dark:text-gray-300">{`Hello, ${
              userProfile?.name.split(" ")[0]
            }`}</span>
          )} */}

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link href="/">
                <Home className="w-4 h-4" />
                <span className="hidden lg:inline ">Home</span>
              </Link>
            </Button>
            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link href="/plants">
                <Sprout className="w-4 h-4" />
                <span className="hidden lg:inline">Plant</span>
              </Link>
            </Button>
            <Toogle />

            {user ? (
              <>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2"
                  asChild
                >
                  <Link href={app.signOut}>
                    <LogOut className="w-4 h-4" />
                    <span className="hidden lg:inline ">Sign Out</span>
                  </Link>
                </Button>

                <UserButton />
              </>
            ) : (
              <Button
                variant="ghost"
                className="flex items-center gap-2"
                asChild
              >
                <Link href={app.signIn}>
                  <LogIn className="w-4 h-4" />
                  <span className="hidden lg:inline ">Sign In</span>
                </Link>
              </Button>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/plants">
                <Sprout className="w-4 h-4" />
              </Link>
            </Button>
            <Toogle />
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
