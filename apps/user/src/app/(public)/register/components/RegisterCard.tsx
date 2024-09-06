"use client";

import { ChangeEvent, FormEvent, useState } from "react";

import { FormDataField } from "@/app/core/constants/formData";
import { BASE_URL } from "@/lib/constants";

const RegisterCard = () => {
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
        console.log("Error: ", errorMessage);
      }
      const data = await response.json();
      const accessToken = data.access_token;
      localStorage.setItem("token", accessToken);
      console.log("Submitted");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="text-black">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email*"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password*"
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RegisterCard;
