"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import React, { EventHandler, useState } from "react";

const page = () => {
  const { toast } = useToast();
  const [mail, setMail] = useState("");
  const [pw, setPw] = useState("");

  const handleMailChange = (e: any) => {
    setMail(e.target.value);
  };
  const handlePwChange = (e: any) => {
    setPw(e.target.value);
  };

  const handleSubmit = () => {
    toast({
      title: "click registered",
      description: "done",
    });
  };

  return (
    <div className="flex flex-col gap-16 min-h-screen bg-slate-700">
      <input
        type="text"
        onChange={handleMailChange}
        name="mail"
        value={mail}
        placeholder="Enter Email"
      />
      <input
        type="text"
        onChange={handlePwChange}
        name="mail"
        value={pw}
        placeholder="Enter Password"
      />
      <Button type="submit" onClick={handleSubmit}>
        Test
      </Button>
    </div>
  );
};

export default page;
