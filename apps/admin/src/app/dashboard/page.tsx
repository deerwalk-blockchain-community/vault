import React from "react";
import { LogSummary, OverallSummary, Welcome } from "./components";
import Overview from "./components/Overview";

const page = () => {
  return (
    <div className="flex flex-col">
      <div>
        <Welcome name={"Krish"} />
      </div>
      <div className="grid grid-cols-3 gap-10">
        <LogSummary />
        <OverallSummary />
        <Overview />
      </div>
    </div>
  );
};

export default page;
