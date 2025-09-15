"use client";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import Loader from "../shared/Loader";
import { FaRegHeart } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { Badge } from "../ui/badge";

const links = [
  {
    path: "/",
    label: "Home",
  },
  {
    path: "/products",
    label: "Products",
  },
  {
    path: "/categories",
    label: "Categories",
  },
  {
    path: "brand",
    label: "brand",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  return (
    <section className="py-6 shadow fixed right-0 left-0 z-[100000] bg-white">
      <div className="container mx-auto px-3">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-semibold tracking-tighter">
              Exclusive
            </span>
          </Link>
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              {links.map((link, index) => (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink
                    href={link.path}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      pathname === link.path && "text-red-500"
                    )}
                  >
                    {link.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="hidden items-center gap-4 lg:flex">
            {status === "loading" ? (
              <Loader />
            ) : status === "unauthenticated" ? (
              <>
                <Button variant="outline" asChild>
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Sign up</Link>
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/wishlist" className="relative">
                  <FaRegHeart className="size-5" />
                  <Badge variant="destructive" className="absolute -top-1/2 -end-1/2 h-4 min-w-4 rounded-full px-1 font-mono tabular-nums">
                    0
                  </Badge>
                </Link>
                <Link href="/cart" className="relative">
                  <FiShoppingCart className="size-5" />
                  <Badge variant="destructive" className="absolute -top-1/2 -end-1/2 h-4 min-w-4 rounded-full px-1 font-mono tabular-nums">
                    0
                  </Badge> 
                </Link>
                <Link href="/profile">
                  <FaRegUser className="size-5" />
                </Link>
                {/* <Link href="/profile">{session?.user.name}</Link>
                <Button
                  variant="outline"
                  onClick={() => signOut({ callbackUrl: "/login" })}
                >
                  Sign out
                </Button> */}
              </div>
            )}
          </div>

          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <MenuIcon className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="max-h-screen overflow-auto">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2">
                    <span className="text-lg font-semibold tracking-tighter">
                      Exclusive
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col p-4">
                <div className="flex flex-col gap-6">
                  {links.map((link, index) => (
                    <Link
                      key={index}
                      href={link.path}
                      className={cn(
                        "font-medium",
                        pathname === link.path && "text-red-500"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                <div className="mt-6 flex flex-col gap-4">
                  {status === "loading" ? (
                    <Loader />
                  ) : status === "unauthenticated" ? (
                    <>
                      <Button variant="outline" asChild>
                        <Link href="/login">Sign in</Link>
                      </Button>
                      <Button asChild>
                        <Link href="/register">Sign up</Link>
                      </Button>
                    </>
                  ) : (
                    <div className="flex items-center gap-4">
                      <Link href="/wishlist">
                        <FaRegHeart className="size-5" />
                      </Link>
                      <Link href="/cart">
                        <FiShoppingCart className="size-5" />
                      </Link>
                      <Link href="/profile">
                        <FaRegUser className="size-5" />
                      </Link>
                      {/* <Link href="/profile">{session?.user.name}</Link>
                        <Button
                          variant="outline"
                          onClick={() => signOut({ callbackUrl: "/login" })}
                        >
                          Sign out
                        </Button> */}
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </section>
  );
}
