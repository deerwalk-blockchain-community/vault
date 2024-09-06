"use client";
import SideBar from "@/components/SideBar";
import DashboardOverview from "./components/DashboardOverview";
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

const token: string | null = JSON.parse(
  JSON.stringify(localStorage.getItem("token") || "")
);
const DashboardPage = () => {
  const { data: user = [], mutate } = useSWR(
    token ? `${BASE_URL}/user/kyc` : null,
    (url) => fetcher(url, token || "")
  );

  console.log(user);

  return (
    <section className="w-full">
      <div className="w-[95%] mx-auto gap-8 flex flex-row">
        <SideBar />
        <div className="mt-10 w-full">
          <DashboardOverview data={user} />
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
