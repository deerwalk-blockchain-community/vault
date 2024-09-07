"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const EditRequest = () => {
  const router = useRouter();
  return (
    <div className="bg-[#1a1b1d] w-full mt-8 mx-auto rounded-xl">
      <div className="w-[90%] mx-auto py-8">
        <div className="text-center ">
          <Button
            className="bg-[#242424]"
            onClick={() => router.push("/dashboard")}
          >
            {" "}
            Visit Dashboard{" "}
          </Button>
          <p className="mt-8">If you have any queries, Contact Us</p>
        </div>
      </div>
    </div>
  );
};

export default EditRequest;
