import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useEffect } from "react";
import ButtonFill from "ui/buttonFill";
import ButtonNoFill from "ui/buttonNoFill";

const Form = ({
  handleNextStep,
  handleBackStep,
  formData,
  setFormData,
  handleFrontImageChange,
  handleBackImageChange,
  frontImagePreview,
  backImagePreview,
}: {
  handleNextStep: any;
  handleBackStep: any;
  formData?: any;
  setFormData?: any;
  handleFrontImageChange: any;
  handleBackImageChange: any;
  frontImagePreview: any;
  backImagePreview: any;
}) => {
  const handleSave = () => {
    console.log(formData);
    handleNextStep();
  };

  const countries: string[] = ["USA", "Nepal", "Japan"];
  return (
    <div className="bg-[#1a1b1d] w-[70%] mt-24 mx-auto rounded-xl">
      <h1 className="text-center text-2xl font-semibold pt-8">
        Upload Proof of Your Identity
      </h1>
      <form className="flex flex-col items-center">
        <div className="w-full text-center mt-12 flex flex-col items-center">
          <label>Your country</label>
          <select name="" id="" className="w-1/5 bg-[#242424] mt-3 px-4 py-2">
            {countries.map((el, index) => {
              return <option key={index}>{el}</option>;
            })}
          </select>
        </div>
        <div className="w-full flex mt-12 justify-center gap-8">
          <div className="flex items-center justify-center w-2/5">
            <label
              htmlFor="dropzone-front-file"
              className="flex flex-col items-center justify-center w-[75%] aspect-square border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-[#242424] hover:bg-[#383737]"
            >
              {frontImagePreview ? (
                <div>
                  <Image
                    src={frontImagePreview}
                    alt="Selected profile preview"
                    width={500}
                    height={500}
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <h3 className="mb-2 text-lg text-white">
                    Front Side of your Document
                  </h3>
                  <p className="text-sm text-center text-gray-400 mb-2">
                    Note: Do not use Filters/Effects on the picture
                  </p>
                  <p className="text-xs text-gray-400">SVG, PNG, JPG or GIF</p>
                </div>
              )}

              <input
                id="dropzone-front-file"
                type="file"
                className="hidden"
                onChange={handleFrontImageChange}
              />
            </label>
          </div>

          <div className="flex items-center justify-center w-2/5">
            <label
              htmlFor="dropzone-back-file"
              className="flex flex-col items-center justify-center w-[75%] aspect-square border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-[#242424] hover:bg-[#383737]"
            >
              {backImagePreview ? (
                <div>
                  <Image
                    src={backImagePreview}
                    alt="Selected profile preview"
                    width={500}
                    height={500}
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <h3 className="mb-2 text-lg text-white">
                    Back Side of your Document
                  </h3>
                  <p className="text-sm text-center text-gray-400 mb-2">
                    Note: Do not use Filters/Effects on the picture
                  </p>
                  <p className="text-xs text-gray-400">SVG, PNG, JPG or GIF</p>
                </div>
              )}

              <input
                id="dropzone-back-file"
                type="file"
                className="hidden"
                onChange={handleBackImageChange}
              />
            </label>
          </div>
        </div>

        <div className="w-full flex justify-center gap-4 mt-8 pb-6">
          <Button className="border" onClick={handleBackStep}>
            Back
          </Button>
          <Button className="border border-yellow-500" onClick={handleSave}>
            Save and Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Form;
