"use client";
import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoIosDocument, IoMdNotifications } from "react-icons/io";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const SideBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    // Update active item based on the current path
    if (pathname === "/dashboard") {
      setActiveItem("Dashboard");
    } else if (pathname === "/form") {
      setActiveItem("KYC Form");
    } else if (pathname === "/notifications") {
      setActiveItem("Notifications");
    }
  }, [pathname]);

  const handleClick = (item: string) => {
    setActiveItem(item);
    if (item === "Dashboard") {
      router.push("/dashboard");
    } else if (item === "KYC Form") {
      router.push("/form");
    } else if (item === "Notifications") {
      router.push("/notifications");
    }
  };

  return (
    <section className="mt-12 h-screen w-[350px]">
      <div className="h-[90%] bg-[#1A1B1D] px-10 pt-10 border border-[#1A1B1D] rounded-lg">
        <h1 className="text-center text-3xl font-bold text-[#fcfc03]">VAULT</h1>

        <div className="h-[1px] bg-[#8697C3] mt-8 mb-4"></div>

        <div className="flex flex-col text-xl text-white">
          <div
            className={`flex gap-2 items-center mb-5 hover:cursor-pointer py-1 px-2 ${
              activeItem === "Dashboard"
                ? "bg-[#fcfc03] text-black border border-[#fcfc03] rounded-lg"
                : ""
            }`}
            onClick={() => handleClick("Dashboard")}
          >
            <div>
              <MdDashboard />
            </div>
            <div>
              <p>Dashboard</p>
            </div>
          </div>
          <div
            className={`flex gap-2 items-center mb-5 hover:cursor-pointer py-1 px-2 ${
              activeItem === "KYC Form"
                ? "bg-[#fcfc03] text-black border border-[#fcfc03] rounded-lg"
                : ""
            }`}
            onClick={() => handleClick("KYC Form")}
          >
            <div>
              <IoIosDocument />
            </div>
            <div>
              <p>KYC Form</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SideBar;
