import SideBar from "@/components/SideBar";
import DashboardOverview from "./components/DashboardOverview";

const DashboardPage = () => {
  return (
    <section className="w-full">
      <div className="w-[95%] mx-auto gap-8 flex flex-row">
        <SideBar />
        <div className="mt-10 w-full">
          <DashboardOverview />
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
