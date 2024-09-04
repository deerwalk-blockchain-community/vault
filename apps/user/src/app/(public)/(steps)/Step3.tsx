import SideBar from "ui/SideBar";
import PersonalInformation from "./components/PersonalInformation";

const Step3 = ({ handleNextStep }: { handleNextStep: any }) => {
  const handleSave = () => {
    handleNextStep();
  };
  return (
    <div className="w-full">
      <div className="w-[95%] mx-auto flex flex-row gap-8">
        <SideBar />
        <div className="mt-10 w-full">
          <PersonalInformation handleNextStep={handleSave} />
        </div>
      </div>
    </div>
  );
};

export default Step3;
