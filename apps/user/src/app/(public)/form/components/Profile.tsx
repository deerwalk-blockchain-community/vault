import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useSWR from "swr";
import { BASE_URL } from "@/lib/constants";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

const token: string | null = JSON.parse(
  JSON.stringify(localStorage.getItem("token") || "")
);

const Profile = () => {
  const router = useRouter();
  const { data: authData, error: authError } = useSWR(
    token ? `${BASE_URL}/auth/me` : null,
    (url) => fetcher(url, token || "")
  );

  const { data: kycData, error: kycError } = useSWR(
    token ? `${BASE_URL}/user/kyc` : null,
    (url) => fetcher(url, token || "")
  );

  const username = "@" + (authData?.email?.split("@")[0] || "");
  const profileImage = kycData?.kyc?.profileImage
    ? `${BASE_URL}/uploads/${kycData.kyc.profileImage}`
    : "/images/batman.png";
  const firstName = kycData?.kyc?.firstName || "";
  const lastName = kycData?.kyc?.lastName || "";

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="absolute right-0 flex gap-2 max-h-16 items-center">
          <div className="border border-[#fcfc03] rounded-[50%] w-16 h-16">
            <Image
              src={profileImage}
              alt="Profile Image"
              width={100}
              height={100}
              className="rounded-full"
            />
          </div>
          <div>
            <p className="text-gray-500 text-sm">{username}</p>
            <p className="text-white">
              {firstName} {lastName}
            </p>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-inherit text-white">
        <DropdownMenuItem>
          Settings
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          Logout
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
