"use client";
import { Button } from "@/components/ui/button";

export default function AppButtons({ children, ...prop }:React.ComponentProps<typeof Button>) {
  return <Button {...prop}>{children}</Button>;
}
