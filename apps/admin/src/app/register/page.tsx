"use client";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
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

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:1337/v1/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/JSON",
        },
        body: JSON.stringify({ email: mail, password: pw }),
      });

      if (response.ok) {
        const json_token = await response.json();
        const token = json_token.access_token;
        localStorage.setItem("token", JSON.stringify(token));
        toast({
          title: "user created successfully",
          description: "Proceed to login",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong!",
        action: <ToastAction altText="Try Again">Try Again</ToastAction>,
      });
    }
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
