"use client";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { AuthRepository } from "@/domain/repositories/authRepository";
import { useRouter } from "next/navigation";
import React, { EventHandler, FormEvent, useState } from "react";

const page = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setMail] = useState("");
  const [password, setPw] = useState("");

  const handleMailChange = (e: any) => {
    setMail(e.target.value);
  };
  const handlePwChange = (e: any) => {
    setPw(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const token = await AuthRepository.login({ email, password });
      localStorage.setItem("token", JSON.stringify(token));
      toast({
        title: "User logged in successfully",
        description: "Redirecting to dashboard.....",
      });
      router.push("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong!",
        description: `${error}`,
        action: <ToastAction altText="Try Again">Try Again</ToastAction>,
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-16 min-h-screen bg-slate-700">
      <p className="text-white text-lg ">Login Test</p>
      <form
        action="POST"
        onSubmit={handleSubmit}
        className="flex flex-col gap-5"
      >
        <input
          type="text"
          onChange={handleMailChange}
          name="mail"
          value={email}
          placeholder="Enter Email"
        />
        <input
          type="text"
          onChange={handlePwChange}
          name="mail"
          value={password}
          placeholder="Enter Password"
        />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default page;
