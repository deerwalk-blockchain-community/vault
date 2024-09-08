import { Metadata } from "next";

import { LOGIN_PAGE, ROUTE_METADATA } from "@/app/core/constants/routes";

import LoginSection from "./components/LoginSection";
import LoginCard from "./components/LoginCard";

export const metadata: Metadata = {
  title: ROUTE_METADATA[LOGIN_PAGE],
};

const RegisterPage = () => {
  return (
    <div>
      <LoginCard />
    </div>
  );
};

export default RegisterPage;
