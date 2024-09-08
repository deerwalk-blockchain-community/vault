"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const NewUserDashboard = () => {
  const router = useRouter();
  return (
    <div className="bg-[#1a1b1d] w-full mt-8 mx-auto rounded-xl">
      <div className="w-[90%] mx-auto py-8">
        <h1 className="text-center text-2xl font-semibold ">
          You Haven&apos;t Filled Out the KYC Yet
        </h1>
        <div className="text-center mt-8">
          <Button className="bg-[#242424]" onClick={() => router.push("/form")}>
            {" "}
            Fill KYC{" "}
          </Button>
          <p className="mt-8">If you have any queries, Contact Us</p>
        </div>
      </div>
    </div>
  );
};

export default NewUserDashboard;
