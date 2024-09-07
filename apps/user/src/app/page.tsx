"use client";

import useAuthRedirect from "@/hooks/useAuthRedirect";
import { useRouter } from "next/navigation";

export default function Home() {
  useAuthRedirect();
}
