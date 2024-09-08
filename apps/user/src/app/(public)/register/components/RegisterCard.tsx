"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { FormDataField } from "@/app/core/constants/formData";
import { BASE_URL } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

const RegisterCard = () => {
  useAuthRedirect();
  const { toast } = useToast();
  const router = useRouter();
  const [formData, setFormData] = useState<FormDataField>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        toast({
          title: "Registration Error",
          description:
            errorMessage.message || "Registration failed. Please try again.",
          variant: "destructive",
        });
        return; // Exit function if error occurs
      }

      const data = await response.json();
      const accessToken = data.access_token;

      if (typeof window !== "undefined") {
        localStorage.setItem("token", JSON.stringify(accessToken));
      }

      toast({
        title: "Registration Successful",
        description: "Redirecting to form...",
      });

      router.push("/form");
    } catch (error) {
      console.error(error);
      toast({
        title: "Unexpected Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="w-[80%] mx-auto">
      <div className="p-8 ">
        <h1 className="text-2xl font-semibold text-[#FCFC03]">VAULT</h1>
        <h1 className="text-4xl mt-20">
          Welcome to <span className="font-semibold">VAULT</span>
        </h1>
        <p className="my-8 font-light">
          Already a member?{" "}
          <Link href={"/login"}>
            <span className="text-[#FCFC03]">Sign up</span>
          </Link>
        </p>
        <div className="text-black">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col w-1/3 text-white">
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email*"
                  onChange={handleChange}
                  className="bg-[#1a1b1d] p-3 mb-8 rounded-xl w-full"
                  required
                />
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} // Toggle between "text" and "password"
                  name="password"
                  placeholder="Password*"
                  onChange={handleChange}
                  className="bg-[#1a1b1d] p-3 mb-8 rounded-xl w-full"
                  required
                />
                {/* Toggle Icon */}
                <span
                  className="absolute right-4 top-3.5 cursor-pointer"
                  onClick={handlePasswordToggle}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-400" />
                  ) : (
                    <FaEye className="text-gray-400" />
                  )}
                </span>
              </div>
            </div>

            <Button
              type="submit"
              className="border border-[#FCFC03] bg-[#FCFC03] hover:opacity-80 hover:bg-[#FCFC03] text-black rounded-xl py-6 px-4 w-[15%] text-md"
            >
              Register
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegisterCard;
