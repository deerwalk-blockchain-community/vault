"use client";
import { LogSummary, OverallSummary, Welcome } from "./components";
import Overview from "./components/Overview";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import { APIUserRepository } from "@/domain/repositories/UserRepository";
import useSWR from "swr";
import Profile from "@/components/ui/Profile";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Datatable from "../../components/Datatable";
import SideBar from "@/components/ui/SideBar";
import { ForwardIcon } from "lucide-react";
import { BsForward } from "react-icons/bs";
import { FaForward, FaForwardStep } from "react-icons/fa6";
import { FiFastForward } from "react-icons/fi";
import { BASE_URL } from "@/lib/constants";

const getToken = () => {
  const storedToken = localStorage.getItem("token");
  if (storedToken) {
    const parsedToken = JSON.parse(storedToken);
    return parsedToken;
  }
};

const page = () => {
  useAuthRedirect("/dashboard");
  const token = getToken();
  const apiUserRepository = new APIUserRepository({ token });
  const fetcher = async (url: string) => {
    return apiUserRepository.getUserInfo();
  };

  const { data: user, error } = useSWR<any>(`${BASE_URL}/user/kyc`, fetcher);

  const { data: users_info } = useSWR<any>(
    `${BASE_URL}/user?limit=10&page=0&descending=true`,
    fetcher
  );

  console.log(users_info);

  return (
    <div className="flex flex-row space-x-2 px-5">
      <div className="mr-5">
        <SideBar />
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
          <Welcome name={"Admin"} />
        </div>
        <div className="grid grid-cols-3 gap-10">
          <LogSummary />
          <OverallSummary />
          <Overview />
          <div className="col-span-3">
            <p className="flex flex-row gap-2 justify-end">
              <Link
                href={"/requests"}
                className="flex flex-row items-center gap-2"
              >
                See All
                <FiFastForward />
              </Link>
            </p>
            <Datatable limit={3} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
