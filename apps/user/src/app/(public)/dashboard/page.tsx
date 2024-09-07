"use client";
import SideBar from "@/components/SideBar";
import DashboardOverview from "./components/DashboardOverview";
import useSWR from "swr";
import { BASE_URL } from "@/lib/constants";
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

const token: string | null =
  typeof window !== "undefined"
    ? JSON.parse(JSON.stringify(localStorage.getItem("token") || ""))
    : null;
const DashboardPage = () => {
  const router = useRouter();
  let rejectId;
  const { data: user = [], mutate } = useSWR(
    token ? `${BASE_URL}/user/kyc` : null,
    (url) => fetcher(url, token || "")
  );

  const { data: rejection = [], mutate: mutateRejection } = useSWR(
    token ? `${BASE_URL}/user/rejections?limit=2&page=1&descending=true` : null,
    (url) => fetcher(url, token || "")
  );

  const handleReason = (user_id: string) => {
    let rejectedUser = rejection?.find(
      (item: any) => item.kyc?.userId === user_id
    );
    return rejectedUser?.reason || "No reason available";
  };

  const handleReapply = (user_id: string) => {
    rejectId = user_id;
    router.push(`/form?ref=${encodeURIComponent(user_id)}`);
  };

  return (
    <section className="w-full">
      <div className="w-[95%] mx-auto gap-8 flex flex-row">
        <SideBar />
        <div className="mt-10 w-full">
          <DashboardOverview
            handleReason={handleReason}
            handleReapply={handleReapply}
            data={user}
          />
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
