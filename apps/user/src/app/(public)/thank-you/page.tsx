"use client";
import SideBar from "@/components/SideBar";
import ProcessSection from "./components/ProcessSection";
import EditRequest from "./components/EditRequest";
import Profile from "../form/components/Profile";
// import useAuthRedirect from "@/hooks/useAuthRedirect";

const ThankYouPage = () => {
  // useAuthRedirect();
  return (
    <section>
      <div className="w-[95%] mx-auto gap-8 flex flex-row">
        <SideBar />
        <Profile />
        <div className="mt-10 w-full">
          <ProcessSection />

          <EditRequest />
        </div>
      </div>
    </section>
  );
};

export default ThankYouPage;
