import { Metadata } from "next";

import { LOGIN_PAGE, ROUTE_METADATA } from "@/app/core/constants/routes";

import LoginSection from "./components/LoginSection";

export const metadata: Metadata = {
  title: ROUTE_METADATA[LOGIN_PAGE],
};

const RegisterPage = () => {
  return (
    <div className="bg-slate-600">
      <LoginSection />
    </div>
  );
};

export default RegisterPage;
