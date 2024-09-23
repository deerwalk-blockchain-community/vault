import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import CardComponent from "./CardComponent";

const LogSummary = () => {
  return (
    <CardComponent header="Log Summary">
      <div className="text-white flex flex-col justify-center  gap-5 text-sm lg:text-md ">
        <div className="">
          <p className="text-sm lg:text-2xl">5</p>
          <p className="text-sm">Verified and approved</p>
        </div>
        <div>
          <p className=" text-sm lg:text-2xl">11</p>
          <p className="text-sm">Yet to verify and approve</p>
        </div>
      </div>
    </CardComponent>
  );
};

export default LogSummary;
