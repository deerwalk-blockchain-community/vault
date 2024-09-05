import Profile from "@/components/Profile";
import SideBar from "@/components/SideBar";
import KYCVerification from "./components/KYCVerification";
import Navbar from "@/components/Navbar";

const HomePage = () => {
  return (
    <div className="relative w-[95%] m-auto flex ">
      <SideBar />
      <div className="w-full ">
        <Navbar />
        <KYCVerification />
      </div>
    </div>
  );
};

export default HomePage;
