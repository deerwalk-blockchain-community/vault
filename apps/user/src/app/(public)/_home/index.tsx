import Profile from "@/components/Profile";
import SideBar from "@/components/SideBar";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const HomePage = () => {
  return (
    <section className="w-[80%] mx-auto ">
      <h1 className="text-2xl font-semibold text-[#FCFC03] p-8">VAULT</h1>
      <div className="grid grid-cols-2 mt-20">
        <div className="p-8 w-4/5">
          <h1 className="text-4xl font-bold">
            MOST SECURE KYC VERIFICATION SYSTEM
          </h1>
          <p className="my-8 font-light">
            Secure, decentralized KYC verification that empowers you with a
            unique token for seamless, autofilled identity verification across
            platforms.
          </p>
          <div className="text-black">
            <form>
              <div className="flex flex-col w-1/3 text-white"></div>
              <Link href={"/register"}>
                <Button
                  type="submit"
                  className="border border-[#FCFC03] bg-[#FCFC03] hover:opacity-80 hover:bg-[#FCFC03] text-black rounded-xl py-6 px-4 text-md"
                >
                  Create your account
                </Button>
              </Link>
            </form>
          </div>
        </div>
        <div>
          <Image
            src={"/images/hero_image.svg"}
            alt="Hero Image"
            width={500}
            height={500}
          />
        </div>
      </div>
    </section>
  );
};

export default HomePage;
