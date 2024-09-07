"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { AuthRepository } from "@/domain/repositories/authRepository";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, { EventHandler, FormEvent, useState } from "react";

const Page = () => {
  const { toast } = useToast();
  const router = useRouter();
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
      const token = await AuthRepository.register({ email, password });
      localStorage.setItem("token", JSON.stringify(token));
      toast({
        title: "User created successfully",
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
    <div className="flex flex-col items-center justify-center gap-16 min-h-screen bg-primary">
      <Card>
        <CardHeader>
          <CardTitle>Admin Register</CardTitle>
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
            />

            <Input
              type="text"
              onChange={handlePwChange}
              name="mail"
              value={password}
              placeholder="Enter Password"
            />
            <Button type="submit" className="text-white">
              Register
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm">
            Already registered? Proceed to{" "}
            <Link href="/login" className="text-blue-500 font-bold">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
