"use client"

import * as React from "react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Image from "next/image"
import logo from "@images/logo.webp"
import { Menu, X ,Heart, LogOut, ShoppingCart, UserPlus } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { CartCreatedContext } from "@/context/CartContext/CartContext"
import { getUserCart } from "@/components/AddToCart/AddToCart.action"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

export default function NavigationMenuDemo() {

  const {cartCount, setCartCount} = React.useContext(CartCreatedContext); 
    const [open, setOpen] = React.useState(false);


  const {data} = useSession();
  const router = useRouter()

  React.useEffect(function(){
    setCartCount(getUserCart().then(function(data) {
      return data.numOfCartItems;
    }));
  },[])

  async function handleLogOut() {
    await signOut({redirect:false});
    router.push('/');
  }

  return (
<nav className="shadow">
      <div className="container mx-auto w-[95%] py-3 flex items-center justify-between">

        {/* Logo */}
        <Image src={logo} alt="Logo" className="w-[120px]" />

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">

          <Link href="/" className="hover:text-main-color">Home</Link>
          <Link href="/category" className="hover:text-main-color">Category</Link>
          <Link href="/brands" className="hover:text-main-color">Brands</Link>

          <Link href="/wishlist"><Heart /></Link>

          <Link href="/cart" className="flex items-center gap-1">
            <ShoppingCart />
            <span>{data ? cartCount : ""}</span>
          </Link>

          {data ? (
            <div className="flex items-center gap-3">
              <span className="capitalize text-main-color">
                {data?.user?.name}
              </span>
              <button onClick={handleLogOut} className="flex items-center gap-1">
                LogOut <LogOut />
              </button>
            </div>
          ) : (
            <Link href="/register" className="flex items-center gap-1">
              <UserPlus /> Sign Up
            </Link>
          )}
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white shadow px-6 py-4 flex flex-col gap-4">

          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/category" onClick={() => setOpen(false)}>Category</Link>
          <Link href="/brands" onClick={() => setOpen(false)}>Brands</Link>

          <Link href="/wishlist" onClick={() => setOpen(false)}>
            Wishlist
          </Link>

          <Link href="/cart" onClick={() => setOpen(false)}>
            Cart ({data ? cartCount : 0})
          </Link>

          {data ? (
            <>
              <span className="text-main-color capitalize">
                {data?.user?.name}
              </span>
              <button onClick={handleLogOut}>
                LogOut
              </button>
            </>
          ) : (
            <Link href="/register" onClick={() => setOpen(false)}>
              Sign Up
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="flex flex-col gap-1 text-sm">
            <div className="leading-none font-medium">{title}</div>
            <div className="line-clamp-2 text-muted-foreground">{children}</div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
