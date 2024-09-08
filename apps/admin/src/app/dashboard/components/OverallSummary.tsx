import React from "react";
import CardComponent from "./CardComponent";
import {
  CheckCheckIcon,
  CrosshairIcon,
  CrossIcon,
  FastForward,
  FastForwardIcon,
  ForwardIcon,
  InfoIcon,
  LucideCross,
  LucideFastForward,
  LucideForward,
  LucideStepForward,
  SendIcon,
  SkipForward,
  UtensilsCrossed,
} from "lucide-react";
import Link from "next/link";

const OverallSummary = () => {
  return (
    <CardComponent header="Overall Summary">
      <div className="flex flex-col lg:flex-row  justify-between lg:gap-16 gap-2 text-sm lg:text-md">
        <div className="flex flex-col justify-center lg:gap-5">
          <div className="flex flex-col justify-center gap-2">
            <p className="flex gap-2 ">
              <SendIcon className="max-w-5 hidden lg:block" /> <span>52</span>
            </p>
            <p className="flex gap-2">
              <span>Total KYC filled </span>
              <InfoIcon className="w-5 hidden lg:block" />
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="flex gap-2">
              <CrossIcon className="max-w-5 hidden lg:block" /> <span>52</span>
            </p>
            <p className="flex flex-col lg:flex-row gap-2">
              <span>Rejected KYC </span>
              <span>{11}</span>
              <InfoIcon className="max-w-5 hidden lg:block" />
            </p>
          </div>
        </div>

        <div className="flex flex-col  justify-center lg:gap-5">
          <div className="flex flex-col items-center lg:items-start gap-2 ">
            <p className="lg:text-sm text-xs font-thin">
              Last Pushed {5} hours ago.
            </p>
          </div>
          <div className=" hidden lg:flex flex-col items-center lg:items-start gap-2">
            <p className="font-thin">Active in Vault</p>
            <p className="flex flex-row lg:flex-row gap-2">
              <CheckCheckIcon className="hidden lg:block" />
              <span>{11}</span>
            </p>
          </div>
        </div>
      </div>
    </CardComponent>
  );
};

export default OverallSummary;
