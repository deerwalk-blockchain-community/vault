import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/lib/constants";
import Image from "next/image";
import { useEffect, useState } from "react";

const DashboardOverview = ({
  data,
  handleReapply,
  handleReason,
}: {
  data: any;
  handleReapply: (user: string) => void;
  handleReason: (user: string) => string;
}) => {
  const [profileImage, setProfileImage] = useState<string>("");

  useEffect(() => {
    const image = data?.kyc?.profileImage;

    if (image && typeof image !== "string") {
      // Handle File object
      const imageUrl = URL.createObjectURL(image);
      setProfileImage(imageUrl);

      return () => {
        URL.revokeObjectURL(imageUrl); // Cleanup URL object
      };
    } else if (typeof image === "string") {
      // Handle URL string
      setProfileImage(`${BASE_URL}/uploads/${image}`);
    }
  }, [data?.kyc?.profileImage]);

  const dateTime = data?.kyc?.createdAt;
  const [date, time] = dateTime?.split("T") ?? ["N/A", "N/A"];

  return (
    <div>
      <h1 className="text-2xl mt-12">Dashboard Overview</h1>

      <div className="flex flex-row gap-4 mt-4">
        <div className="bg-[#1a1b1d] py-6 px-8 flex gap-4 rounded-xl">
          <div className="w-[150px]">
            <Image
              src={profileImage} // Fallback to placeholder
              alt="Dashboard Profile Image"
              width={500}
              height={500}
              className="object-cover rounded-[50%] aspect-square"
            />
          </div>
          <div className="m-auto">
            <div>
              <p>First Name</p>
              <p className="text-gray-400">{data?.kyc?.firstName}</p>
            </div>
            <div>
              <p>Last Name</p>
              <p className="text-gray-400">{data?.kyc?.lastName}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 ">
          <div className="bg-[#1a1b1d] px-5 pt-4 rounded-xl h-1/2 m-auto pb-4">
            <p className="text-gray-400">Account Created</p>
            <p className="text-2xl">{date}</p>
            <p className="text-sm">{time}</p>
          </div>
          <div className="bg-[#1a1b1d] px-5 pt-4 rounded-xl h-1/2">
            <p className="text-gray-400">Account Status</p>
            <p className="text-2xl flex flex-row justify-between items-center">
              {data?.kyc?.status}

              {data?.kyc?.status === "REJECTED" ? (
                <span className="flex flex-col justify-center">
                  <Button
                    onClick={() => handleReapply(data?.id)}
                    className="bg-red-600"
                  >
                    Reapply
                  </Button>
                  <span className="text-xs text-red-500">
                    Reason : {handleReason(data?.id)}
                  </span>
                </span>
              ) : null}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
