"use client";

import { ChangeEvent, FormEvent, useState } from "react";

import { FormData } from "@/app/core/constants/formData";

const RegisterCard = () => {
  const [formData, setFormData] = useState<FormData>({
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
    console.log("Submitted");
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
