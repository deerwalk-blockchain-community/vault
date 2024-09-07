"use client";

import { ChangeEvent, FormEvent, useState } from "react";

import { FormDataField } from "@/app/core/constants/formData";
import { BASE_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import useAuthRedirect from "@/hooks/useAuthRedirect";

const LoginCard = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormDataField>({
    email: "",
    password: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        console.log("Error: ", errorMessage);
      }

      const data = await response.json();
      const accessToken = data.access_token;
      localStorage.setItem("token", JSON.stringify(accessToken));
      toast({
        title: "User logged in successfully",
        description: "Redirecting to dashboard.....",
      });
      router.push("/form");
      console.log("Submitted");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="text-black">
      <form onSubmit={handleSubmit} className="border border-slate-200 p-8">
        <div className="flex flex-col">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email*"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password*"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoginCard;
