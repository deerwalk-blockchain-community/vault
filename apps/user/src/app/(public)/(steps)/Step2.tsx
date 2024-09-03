import SideBar from "@/../../packages/ui/src/SideBar";
import ButtonFill from "ui/buttonFill";
import ButtonNoFill from "ui/buttonNoFill";
import Form from "./components/Form";
import Profile from "../form/components/Profile";

const Step2 = ({ handleNextStep }: { handleNextStep: any }) => {
  const handleSave = () => {
    handleNextStep();
  };
  return (
    <div className="flex flex-row">
      <SideBar />
      <Profile />
      <div className="mt-10">
        <Form handleNextStep={handleSave} />
      </div>
    </div>
  );
};

export default Step2;
