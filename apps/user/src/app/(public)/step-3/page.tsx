import SideBar from "@/components/SideBar";
import PersonalInformation from "./components/PersonalInformation";

const Step3 = () => {
  return (
    <div className="w-full">
      <div className="w-[95%] mx-auto flex flex-row gap-8">
        <SideBar />
        <div className="mt-10 w-full">
          <PersonalInformation />
        </div>
      </div>
    </div>
  );
};

export default Step3;
