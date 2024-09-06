import { useState } from "react";
import SideBar from "@/components/ui/SideBar";
import Profile from "../form/components/Profile";
import Form from "./components/Form";

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
    <div className="flex flex-row w-full">
      <SideBar />
      <Profile />
      <div className="mt-10 w-full">
        <Form
          handleNextStep={handleNextStep}
          handleBackStep={handleBackStep}
          handleFrontImageChange={handleFrontImageChange}
          handleBackImageChange={handleBackImageChange}
          formData={formData}
        />
      </div>
    </div>
  );
};

export default Step2;
