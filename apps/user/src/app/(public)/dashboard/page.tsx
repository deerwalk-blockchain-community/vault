"use client";
import SideBar from "@/components/SideBar";
import DashboardOverview from "./components/DashboardOverview";
import useSWR from "swr";

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

const token: string | null = JSON.parse(localStorage.getItem("token") || "");
const DashboardPage = () => {
  const { data: user = [], mutate } = useSWR(
    token ? `http://localhost:1337/v1/user/kyc` : null,
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
