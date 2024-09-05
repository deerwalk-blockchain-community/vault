import { Metadata } from "next";
import { HOME_PAGE, ROUTE_METADATA } from "../core/constants/routes";
import HomePage from "./_home";

export const metadata: Metadata = {
  title: ROUTE_METADATA[HOME_PAGE],
};

const Home = () => {
  return <HomePage />;
};

export default Home;
