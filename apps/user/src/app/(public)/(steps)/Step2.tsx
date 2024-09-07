import { useEffect, useState } from "react";
import SideBar from "@/components/SideBar";
import Profile from "../form/components/Profile";
import Form from "./components/Form";
import { BASE_URL } from "@/lib/constants";

const Step2 = ({
  handleNextStep,
  handleBackStep,
  formData,
  setFormData,
  handleFormDataChange,
}: {
  handleNextStep: () => void;
  handleBackStep: () => void;
  formData?: any;
  setFormData?: any;
  handleFormDataChange: any;
}) => {
  const [frontImagePreview, setFrontImagePreview] = useState("");
  const [backImagePreview, setBackImagePreview] = useState("");

  useEffect(() => {
    if (
      formData?.nidFrontImage &&
      formData?.nidBackImage &&
      typeof formData.nidFrontImage !== "string" &&
      typeof formData.nidBackImage !== "string"
    ) {
      const frontImageUrl = URL.createObjectURL(formData.nidFrontImage);
      const backImageUrl = URL.createObjectURL(formData.nidBackImage);
      setFrontImagePreview(frontImageUrl);
      setBackImagePreview(backImageUrl);
      return () => {
        URL.revokeObjectURL(frontImageUrl);
        URL.revokeObjectURL(backImageUrl);
      };
    } else if (
      typeof formData.nidFrontImage == "string" ||
      typeof formData.nidBackImage == "string"
    ) {
      setFrontImagePreview(`${BASE_URL}/uploads/${formData?.nidFrontImage}`);
      setBackImagePreview(`${BASE_URL}/uploads/${formData?.nidBackImage}`);
    }
  }, [formData?.nidFrontImage, formData?.nidBackImage]);

  const handleFrontImageChange = (e: any) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    setFrontImagePreview(URL.createObjectURL(file));
    handleFormDataChange({ nidFrontImage: file });
  };

  const handleBackImageChange = (e: any) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    setBackImagePreview(URL.createObjectURL(file));
    handleFormDataChange({ nidBackImage: file });
  };

  const handleSave = () => {
    handleNextStep();
  };
  return (
    <div className="flex flex-row">
      <SideBar />
      <Profile />
      <div className="mt-10 w-full">
        <Form
          handleNextStep={handleNextStep}
          handleBackStep={handleBackStep}
          handleFrontImageChange={handleFrontImageChange}
          handleBackImageChange={handleBackImageChange}
          formData={formData}
          frontImagePreview={frontImagePreview}
          backImagePreview={backImagePreview}
        />
      </div>
    </div>
  );
};

export default Step2;
