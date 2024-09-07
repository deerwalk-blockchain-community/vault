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
      <div className="flex flex-row items-center justify-between gap-16">
        <div className="flex flex-col justify-center gap-5">
          <div className="flex flex-col justify-center gap-2">
            <p className="flex gap-2">
              <SendIcon className="max-w-5" /> <span>52</span>
            </p>
            <p className="flex gap-2">
              <span>Total KYC filled </span>
              <InfoIcon className="w-5" />
            </p>
          </div>
          <div className="flex flex-col justify-center gap-2">
            <p className="flex gap-2">
              <CrossIcon className="max-w-5" /> <span>52</span>
            </p>
            <p className="flex gap-2">
              <span>Rejected KYC </span>
              <InfoIcon className="max-w-5" />
            </p>
          </div>
        </div>

        <div className="flex flex-col  justify-center gap-5">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex flex-row gap-2">
              <span className="text-md">See all Live KYC </span>
              <span>
                <LucideStepForward />
              </span>
            </Link>
            <p className="text-sm font-thin">Last Pushed {5} hours ago.</p>
          </div>
          <div className="flex flex-col justify-center gap-2">
            <p className="flex flex-row gap-2">
              <CheckCheckIcon />
              <span>{11}</span>
            </p>
            <p className="font-thin">Active in Vault</p>
          </div>
        </div>
      </div>
    </CardComponent>
  );
};

export default OverallSummary;
