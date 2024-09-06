"use client";
import React, { useState } from "react";
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
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

const Page = () => {
  useAuthRedirect("/requests");
  const [searchQuery, setSearchQuery] = useState("");
  const token = JSON.parse(localStorage.getItem("token") || "");
  const { data: users_info, error } = useSWR<any>(
    `${BASE_URL}/user?limit=10&page=1&descending=true`,
    (url: string) => fetcher(url, token || "")
  );
  console.log(users_info);
  return (
    <div className="flex flex-row">
      <SideBar />
      <Profile />

      <div className="flex flex-1 flex-col justify-center items-center">
        <div className="relative mr-auto flex-1 md:grow-0 mx-5">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full bg-primary rounded-lg text-white pl-8 md:w-[140px] lg:w-[220px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-row justify-between p-5 rounded-lg bg-primary w-[99%] mt-16 ">
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
            {/* <p className="flex flex-row">
              Filter{" "}
              <span className="ml-2">
                <SlidersHorizontalIcon />
              </span>
            </p> */}
          </div>
        </div>
        <div className="mt-5 w-[99%]">
          <Datatable data={users_info} searchQuery={searchQuery} />
        </div>
      </div>
    </div>
  );
};

export default Page;
