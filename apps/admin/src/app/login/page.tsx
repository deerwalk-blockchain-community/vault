"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { AuthRepository } from "@/domain/repositories/authRepository";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { EventHandler, FormEvent, useState } from "react";

const Page = () => {
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
      window.localStorage.setItem("token", JSON.stringify(token));
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
    <div className="flex flex-col justify-center items-center gap-16 min-h-screen bg-primary">
      <Card className="">
        <CardHeader>
          <CardTitle>Admin Console</CardTitle>
          <CardDescription>Admin login</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action="POST"
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            <Input
              type="text"
              onChange={handleMailChange}
              name="mail"
              value={email}
              placeholder="Enter Email"
              className="text-black"
            />
            <Input
              type="text"
              onChange={handlePwChange}
              name="mail"
              value={password}
              className="text-black"
              placeholder="Enter Password"
            />
            <Button type="submit" className="text-white">
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm ">
            Don't have an Admin account? Register{" "}
            <Link
              href="/register"
              className="text-blue-500 font-bold hover:cursor-pointer"
            >
              here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
