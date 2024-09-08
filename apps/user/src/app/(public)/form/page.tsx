/* eslint-disable react/jsx-key */
"use client";
import { useEffect, useState } from "react";
import Step1 from "../(steps)/Step1";
import Step2 from "../(steps)/Step2";
import Step3 from "../(steps)/Step3";
import Profile from "./components/Profile";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import useSWR from "swr";
import { BASE_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

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
  useAuthRedirect();
  const router = useRouter();
  const { toast } = useToast();
  const [activeTab, setActive] = useState(1);
  const steps = ["Step 1", "Step 2", "Step 3"];
  const [complete, setComplete] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: "",
      lastName: "",
      gender: "MALE",
      nidNumber: "",
      address: "",
      profileImage: null,
    },
    nidFrontImage: null,
    nidBackImage: null,
  });

  const token: string | null =
    typeof window !== "undefined"
      ? JSON.parse(JSON.stringify(localStorage.getItem("token") || ""))
      : null;

  const { data: userData = [], error } = useSWR(
    token ? `${BASE_URL}/user/kyc` : null,
    (url) => fetcher(url, token || "")
  );
  console.log(userData);
  useEffect(() => {
    if (userData?.kyc) {
      // Ensure the condition to check if KYC is completed or already sent
      toast({
        title: "Application already sent",
        description: "Redirecting...",
      });

      setTimeout(() => {
        router.replace("/thank-you");
      }, 500); // Add a small delay to allow the toast to show
    }
  }, [userData, router, toast]);

  const handleNextStep = () => {
    if (activeTab < steps.length) {
      setActive((prev) => prev + 1);
    } else {
      setComplete(true);
    }
  };

  const handleBackStep = () => {
    if (activeTab > 1) {
      setActive((prev) => prev - 1);
    }
  };

  const handleFormDataChange = (newData: any) => {
    setFormData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  const formElements = [
    <Step1
      handleNextStep={handleNextStep}
      formData={formData.personalInfo}
      setFormData={handleFormDataChange}
    />,
    <Step2
      handleNextStep={handleNextStep}
      handleBackStep={handleBackStep}
      setFormData={handleFormDataChange}
      formData={{
        nidFrontImage: formData.nidFrontImage,
        nidBackImage: formData.nidBackImage,
      }}
      handleFormDataChange={handleFormDataChange}
    />,
    <Step3
      handleNextStep={handleNextStep}
      handleBackStep={handleBackStep}
      formData={formData}
      handleFormDataChange={handleFormDataChange}
    />,
  ];

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="flex flex-col items-center w-full">
      <div className="absolute left-1/2 transform -translate-x-1/2 pb-4 pt-1 rounded-b-xl bg-[#1a1b1d]">
        <h2 className="text-center">KYC Verification</h2>
        <div className="flex flex-row justify-between mt-5">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`step-item ${activeTab === i + 1 && "active"} ${
                (i + 1 < activeTab || complete) && "complete"
              }`}
            >
              <div className="step"></div>
              <p className="text-gray-500">{step}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-[95%] mx-auto">{formElements[activeTab - 1]}</div>
    </div>
  );
};

export default Page;
