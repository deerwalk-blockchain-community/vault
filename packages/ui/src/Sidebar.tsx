"use client";

import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { useState } from "react";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");

  const handleClick = (item: string) => {
    setActiveItem(item);
  };

  return (
    <section className="">
      <div className="min-h-screen bg-[#1A1B1D] border border-[#1A1B1D] rounded-lg w-96">
        {" "}
        <h1 className="text-center text-3xl font-bold text-[#fcfc03]">VAULT</h1>
        <div className="h-[1px] bg-[#8697C3] mt-8 mb-4"></div>
        <div className="flex flex-col items-start justify-center mt-10 text-xl text-white">
          <div
            className={`flex gap-2 items-center mb-5 hover:cursor-pointer py-2 px-4 ${
              activeItem === "Dashboard"
                ? "bg-[#fcfc03] text-black border border-[#fcfc03] rounded-lg"
                : ""
            }`}
            onClick={() => handleClick("Dashboard")}
          >
            <MdDashboard />
            <p>Dashboard</p>
          </div>

          <div
            className={`flex gap-2 items-center mb-5 hover:cursor-pointer py-2 px-4 ${
              activeItem === "Profile"
                ? "bg-[#fcfc03] text-black border border-[#fcfc03] rounded-lg"
                : ""
            }`}
            onClick={() => handleClick("Profile")}
          >
            <FaUser />
            <p>Profile</p>
          </div>

          <div
            className={`flex gap-2 items-center mb-5 hover:cursor-pointer py-2 px-4 ${
              activeItem === "Notifications"
                ? "bg-[#fcfc03] text-black border border-[#fcfc03] rounded-lg"
                : ""
            }`}
            onClick={() => handleClick("Notifications")}
          >
            <IoMdNotifications />
            <p>Notifications</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
