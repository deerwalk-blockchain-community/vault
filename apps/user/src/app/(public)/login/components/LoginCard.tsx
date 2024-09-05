"use client";

import { ChangeEvent, FormEvent, useState } from "react";

import { FormDataField } from "@/app/core/constants/formData";

const LoginCard = () => {
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
      const response = await fetch("http://localhost:1337/v1/auth/login", {
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
      localStorage.setItem("user", JSON.stringify(accessToken));

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
