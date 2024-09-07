import { Metadata } from "next";

import { REGISTER_PAGE, ROUTE_METADATA } from "@/app/core/constants/routes";

import RegisterSection from "./components/RegisterSection";
import RegisterCard from "./components/RegisterCard";

export const metadata: Metadata = {
  title: ROUTE_METADATA[REGISTER_PAGE],
};

const RegisterPage = () => {
  return (
    <div className="">
      <RegisterCard />
    </div>
  );
};

export default RegisterPage;
