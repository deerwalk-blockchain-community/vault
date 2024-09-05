// src/app/(steps)/Step3.tsx

import SideBar from "@/components/ui/SideBar";
import PersonalInformation from "./components/PersonalInformation";

const Step3 = ({
  handleNextStep,
  formData,
  handleFormDataChange,
  handleBackStep,
}: {
  handleNextStep: any;
  handleBackStep: any;
  formData: any;
  handleFormDataChange: any;
}) => {
  const token = JSON.parse(localStorage.getItem("token") || "");
  console.log(token);
  const data = new FormData();
  const handleSubmit = async () => {
    data.append("firstName", formData.personalInfo.firstName);
    data.append("lastName", formData.personalInfo.lastName);
    data.append("gender", formData.personalInfo.gender);
    data.append("nidNumber", formData.personalInfo.nidNumber);
    data.append("address", formData.personalInfo.address);
    data.append("profileImage", formData.personalInfo.profileImage);
    // data.append("status", formData.personalInfo.status);

    if (formData.nidFrontImage) {
      data.append("nidFrontImage", formData.nidFrontImage);
    }
    if (formData.nidBackImage) {
      data.append("nidBackImage", formData.nidBackImage);
    }
    try {
      const response = await fetch("http://localhost:1337/v1/kyc", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });
      if (!response.ok) {
        throw new Error("Failed to submit data");
      }
      handleNextStep();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full">
      <div className="w-[95%] mx-auto flex flex-row gap-8">
        <SideBar />
        <div className="mt-10 w-full">
          <PersonalInformation
            handleBackStep={handleBackStep}
            handleNextStep={handleSubmit}
            data={formData}
          />
        </div>
      </div>
    </div>
  );
};

export default Step3;
