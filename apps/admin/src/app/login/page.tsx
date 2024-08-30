"use client";
import React, { EventHandler, useState } from "react";
// import { Button } from "../../../../../packages/ui/src/components/ui";
import { Button } from "@ui/button";

const page = () => {
  const [mail, setMail] = useState("");
  const [pw, setPw] = useState("");

  const handleMailChange = (e: any) => {
    setMail(e.target.value);
  };
  const handlePwChange = (e: any) => {
    setMail(e.target.value);
  };

  const handleSubmit = () => {
    console.log("works");
  };

  return (
    <div className="flex flex-col gap-16 bg-purple-500">
      <input type="text" onChange={handleMailChange} name="mail" value={mail} />
      <input type="text" onChange={handlePwChange} name="mail" value={pw} />
      <Button type="submit" value="Submit" className="text-black bg-white">
        test{" "}
      </Button>
    </div>
  );
};

export default page;
