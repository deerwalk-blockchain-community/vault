"use client";

import useAuthRedirect from "@/hooks/useAuthRedirect";
import { useRouter } from "next/navigation";
import HomePage from "./(public)/_home";

export default function Home() {
  // useAuthRedirect();
  return <HomePage />;
}
