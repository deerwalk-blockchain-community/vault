import SideBar from "@/components/SideBar";
import ProcessSection from "./components/ProcessSection";
import EditRequest from "./components/EditRequest";

const ThankYouPage = () => {
  return (
    <section>
      <div className="w-[95%] mx-auto gap-8 flex flex-row">
        <SideBar />
        <div className="mt-10 w-full">
          <ProcessSection />
          da
          <EditRequest />
        </div>
      </div>
    </section>
  );
};

export default ThankYouPage;
