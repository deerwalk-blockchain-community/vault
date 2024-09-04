"use client";
import { LogSummary, OverallSummary, Welcome } from "./components";
import Overview from "./components/Overview";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import { APIUserRepository } from "@/domain/repositories/UserRepository";
import useSWR from "swr";
import Profile from "@/components/ui/Profile";

import Sidebar from "@/../../../packages/ui/src/Sidebar";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Datatable from "./components/Datatable";

const getToken = () => {
  return localStorage.getItem("token") || "";
};

const page = () => {
  useAuthRedirect();
  const token = getToken();
  const apiUserRepository = new APIUserRepository({ token });
  const fetcher = async (url: string) => {
    return apiUserRepository.getUserInfo();
  };

  const { data: user, error } = useSWR<any>(
    "http://locahost:1337/v1/auth/me",
    fetcher
  );

  console.log(user);

  return (
    <div className="flex flex-row space-x-2 px-5">
      <div className="mr-5">
        <Sidebar />
      </div>
      <div className="flex flex-col">
        <div
          className=" relative mb-20 
        "
          id="navbar"
        >
          <Profile />
        </div>
        <div>
          <Welcome name={"Krish"} />
        </div>
        <div className="grid grid-cols-3 gap-10">
          <LogSummary />
          <OverallSummary />
          <Overview />
          <div className="col-span-3">
            <Datatable limit={3} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
