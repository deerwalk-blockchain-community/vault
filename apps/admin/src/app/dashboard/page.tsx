import React from "react";
import { Welcome } from "./components";

const page = () => {
  return (
    <div className="flex flex-col">
      <div>
        <Welcome name={"Krish"} />
      </div>
      <div className="grid grid-cols-3"></div>
    </div>
  );
};

export default page;
