"use client";
import { useState } from "react";
import Step1 from "../(steps)/Step1";
import Step2 from "../(steps)/Step2";
import Profile from "./components/Profile";
import SideBar from "ui/SideBar";

const Page = () => {
  const [activeTab, setActive] = useState(1);
  const steps = ["Step 1", "Step 2", "Step 3"];
  const [complete, setComplete] = useState(false);

  const handleNextStep = () => {
    if (activeTab < steps.length) {
      setActive((prev) => prev + 1);
    } else {
      setComplete(true);
    }
  };

  const formElements = [
    <Step1 handleNextStep={handleNextStep} />,
    <Step2 handleNextStep={handleNextStep} />,
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <div className="flex flex-row justify-between mt-5 ">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`step-item ${activeTab === i + 1 && "active"} ${
                (i + 1 < activeTab || complete) && "complete"
              } `}
            >
              <div className="step"></div>
              <p className="text-gray-500">{step}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="">{formElements[activeTab - 1]}</div>
    </div>
  );
};

export default Page;
