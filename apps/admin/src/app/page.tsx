"use client";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import { AppProps } from "next/app";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  useAuthRedirect();
}
