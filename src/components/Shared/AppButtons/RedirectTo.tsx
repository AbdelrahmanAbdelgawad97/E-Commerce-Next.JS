"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function RedirectTo() {
  const router = useRouter();

  function directToLogin() {
    router.push("/login");
  }

  return (
    <Button
      onClick={directToLogin}
      className="bg-main-color cursor-pointer text-white w-full hover:bg-main-color/80"
    >
      Login or Sign in to add to cart
    </Button>
  );
}