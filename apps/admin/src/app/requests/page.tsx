"use client";
import React, { useEffect, useState } from "react";
import Profile from "@/components/ui/Profile";
import { RefreshCwIcon, Search, SlidersHorizontalIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import Datatable from "../../components/Datatable";
import SideBar from "@/components/ui/SideBar";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import useSWR from "swr";
import { BASE_URL } from "@/lib/constants";

const fetcher = async (url: string, token: string): Promise<any> => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${JSON.parse(token)}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

const Page = () => {
  const [token, setToken] = useState<string | null>();
  useAuthRedirect("/requests");

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        const parsedToken = JSON.parse(storedToken);
        setToken(parsedToken);
      }
    }
  }, []);

  return (
    <div className="flex flex-row">
      <div className="hidden lg:block">
        <SideBar />
      </div>
      <Profile />

      <div className="flex flex-1 flex-col justify-center items-center">
        <div className="relative mr-auto flex-1 md:grow-0 mx-5 mt-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full bg-primary rounded-lg text-white pl-8 md:w-[140px] lg:w-[220px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-row justify-between p-5 rounded-lg bg-primary min-w-96 w-[80%] sm:w-[85%] md:w-[90%] lg:w-[99%] mt-16 ">
          <h1>
            Requests{" "}
            <span className="block text-xs pt-1 font-thin">
              {} requests found
            </span>
          </h1>
          <div className="flex flex-row gap-16">
            <p className="flex flex-row">
              Refresh{" "}
              <span className="ml-2">
                <RefreshCwIcon />
              </span>
            </p>
          </div>
        </div>
        <div
          className="mt-5 min-w-96 w-[80%] sm:w-[85%] md:w-[90%] lg:w-[99%]"
          suppressHydrationWarning
        >
          <Datatable searchQuery={searchQuery} />
        </div>
      </div>
    </div>
  );
};

export default Page;
