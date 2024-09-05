"use client";
import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { useState } from "react";
import React from "react";
const SideBar = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");

  const handleClick = (item: string) => {
    setActiveItem(item);
  };

  return (
    <section className="mt-12 w-[28%]">
      <div className="h-full bg-[#1A1B1D] px-10 pt-10 border border-[#1A1B1D] rounded-lg">
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
              activeItem === "Profile"
                ? "bg-[#fcfc03] text-black border border-[#fcfc03] rounded-lg"
                : ""
            }`}
            onClick={() => handleClick("Profile")}
          >
            <div>
              <FaUser />
            </div>
            <div>
              <p>Profile</p>
            </div>
          </div>
          <div
            className={`flex gap-2 items-center mb-5 hover:cursor-pointer py-1 px-2 ${
              activeItem === "Notifications"
                ? "bg-[#fcfc03] text-black border border-[#fcfc03] rounded-lg"
                : ""
            }`}
            onClick={() => handleClick("Notifications")}
          >
            <div>
              <IoMdNotifications />
            </div>
            <div>
              <p>Notifications</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SideBar;
