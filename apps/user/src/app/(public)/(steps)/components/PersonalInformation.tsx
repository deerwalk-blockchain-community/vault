import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";

const PersonalInformation = ({
  handleNextStep,
  data,
}: {
  handleNextStep: any;
  data: any;
}) => {
  const [frontImagePreview, setFrontImagePreview] = useState("");
  const [backImagePreview, setBackImagePreview] = useState("");
  const [isIdConfirmed, setIsIdConfirmed] = useState(false);
  const [isPrivacyPolicyAgreed, setIsPrivacyPolicyAgreed] = useState(false);

  useEffect(() => {
    if (data.frontImage) {
      setFrontImagePreview(URL.createObjectURL(data.frontImage));
    }
    if (data.backImage) {
      setBackImagePreview(URL.createObjectURL(data.backImage));
    }

    return () => {
      if (frontImagePreview) {
        URL.revokeObjectURL(frontImagePreview);
      }
      if (backImagePreview) {
        URL.revokeObjectURL(backImagePreview);
      }
    };
  }, [data.frontImage, data.backImage]);
  console.log(data);

  const handleCheckboxChange = (checkboxType: string) => {
    if (checkboxType === "idConfirmed") {
      setIsIdConfirmed((prev) => !prev);
    } else if (checkboxType === "privacyPolicyAgreed") {
      setIsPrivacyPolicyAgreed((prev) => !prev);
    }
  };
  return (
    <div className="bg-[#1a1b1d] w-full mt-24 mx-auto rounded-xl">
      <div className="w-[90%] mx-auto py-8">
        <h1 className="text-center text-2xl font-semibold mt-4 ">
          Check Your Personal Information
        </h1>
        <div className="flex gap-12 w-full m-auto pt-12">
          <div className="w-full flex gap-6 ">
            <div className="w-full">
              <Image
                src={"/images/handsome_man.jpg"}
                alt="User Image"
                width={1000}
                height={1000}
                className="w-full aspect-square h-auto object-cover rounded-xl"
              />
            </div>
            <div className="w-full">
              <div className="mb-2">
                <p>First Name</p>
                <p className="text-gray-400">{data.personalInfo.firstName}</p>
              </div>
              <div className="mb-2">
                <p>Last Name</p>
                <p className="text-gray-400">{data.personalInfo.lastName}</p>
              </div>
              <div className="mb-2">
                <p>Gender</p>
                <p className="text-gray-400">{data.personalInfo.gender}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <p>NID Number</p>
            <p className="text-gray-400">{data.personalInfo.nidNumber}</p>
          </div>
          <div className="w-full">
            <p>NID Document</p>
            <div className="flex gap-3 mt-2">
              <div>
                <Image
                  src={frontImagePreview}
                  alt="Document Front Photo"
                  width={1000}
                  height={1000}
                  className="w-full rounded-xl"
                />
                <p className="text-center font-light">Front Photo</p>
              </div>
              <div>
                <Image
                  src={backImagePreview}
                  alt="Document Front Photo"
                  width={1000}
                  height={1000}
                  className="w-full rounded-xl"
                />
                <p className="text-center font-light">Back Photo</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <div className="flex items-center mb-4">
            <input
              id="default-checkbox"
              type="checkbox"
              checked={isIdConfirmed}
              onChange={() => handleCheckboxChange("idConfirmed")}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-checkbox"
              className="ms-2 text-white font-light"
            >
              I confirm that I uploaded valid government issued ID. This form
              includes my actual Name, address, picture and my gender.
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              id="default-checkbox"
              type="checkbox"
              checked={isPrivacyPolicyAgreed}
              onChange={() => handleCheckboxChange("privacyPolicyAgreed")}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-checkbox"
              className="ms-2 text-white font-light"
            >
              I read and agree to Privacy Policy.
            </label>
          </div>
          <div className="w-full flex justify-center gap-4 mt-8 pb-6">
            <Button className="border">Back</Button>
            <Button
              className="border border-yellow-500"
              onClick={handleNextStep}
              disabled={!(isIdConfirmed && isPrivacyPolicyAgreed)}
            >
              Save and Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
