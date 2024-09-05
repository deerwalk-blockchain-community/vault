import { GoClock } from "react-icons/go";

const ProcessSection = () => {
  return (
    <div className="bg-[#1a1b1d] w-full mt-24 mx-auto rounded-xl">
      <div className="w-[90%] mx-auto py-8">
        <div className="text-center ">
          <div className="text-5xl p-3 rounded-full inline-block bg-black">
            <GoClock />
          </div>
          <div className="leading-10">
            <p>Thank You</p>
            <p>Your KYC is being processed.</p>
            <p>Your verification status will update automatically.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessSection;
