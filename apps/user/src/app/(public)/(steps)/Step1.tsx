import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SideBar from "@/components/SideBar";
import Profile from "../form/components/Profile";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { BASE_URL } from "@/lib/constants";

const Step1 = ({
  handleNextStep,
  formData,
  setFormData,
}: {
  handleNextStep: any;
  formData: any;
  setFormData?: any;
}) => {
  const [profileImagePreview, setProfileImagePreview] = useState("");

  useEffect(() => {
    if (formData?.profileImage && typeof formData.profileImage !== "string") {
      // If profileImage is not a string, it's assumed to be a File object
      const imageUrl = URL.createObjectURL(formData.profileImage);
      setProfileImagePreview(imageUrl);

      return () => {
        URL.revokeObjectURL(imageUrl); // Clean up the URL object when component unmounts
      };
    } else if (typeof formData?.profileImage === "string") {
      setProfileImagePreview(`${BASE_URL}/uploads/${formData?.profileImage}`);
    }
  }, [formData?.profileImage]);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      personalInfo: {
        ...formData,
        [name]: value,
      },
    });
  };

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      gender: value,
    });
  };

  const handleProfileImage = (e: any) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    formData.profileImage = file;
    setProfileImagePreview(URL.createObjectURL(file));
  };

  const handleSave = () => {
    console.log(formData);
    handleNextStep();
  };

  console.log(formData);

  return (
    <div className="flex flex-row relative">
      <SideBar />
      <Profile />
      <div className="w-full">
        <div className="bg-[#1a1b1d] w-[85%] mt-40 mx-auto rounded-xl">
          <h1 className="text-center text-2xl font-semibold pt-8 ">
            Upload Your Personal Information
          </h1>
          <form>
            <div className="grid grid-cols-10 mt-12 place-items-center w-[90%] mx-auto">
              <div className="col-span-4 grid grid-cols-4 gap-5">
                <div className="col-span-2">
                  <label>First Name</label>
                  <Input
                    name="firstName"
                    type="text"
                    className="text-black"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label>Last Name</label>
                  <Input
                    name="lastName"
                    type="text"
                    className="text-black"
                    // value={formData?.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label>Gender</label>
                  <Select
                    defaultValue="MALE"
                    name="gender"
                    value={formData.gender}
                    onValueChange={(value) => handleSelectChange(value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Choose Gender"></SelectValue>
                    </SelectTrigger>
                    <SelectContent className="bg-white text-black">
                      <SelectItem value="MALE">Male</SelectItem>
                      <SelectItem value="FEMALE">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-4">
                  <label>NID Number</label>
                  <Input
                    name="nidNumber"
                    type="number"
                    value={formData.nidNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-span-4">
                  <label>Address</label>
                  <Input
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="col-span-6 flex items-center justify-end w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-3/5 aspect-square border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-[#242424] hover:bg-[#383737]"
                >
                  {profileImagePreview ? (
                    <div>
                      <Image
                        src={profileImagePreview}
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
                      <h3 className="mb-2 text-lg text-white ">
                        Make sure your face is visible
                      </h3>
                      <p className="text-sm text-center text-gray-400 mb-2">
                        Note: Do not use Filters/Effects on the picture
                      </p>
                      <p className="text-xs text-gray-400">
                        SVG, PNG, JPG, or GIF
                      </p>
                    </div>
                  )}

                  <input
                    onChange={handleProfileImage}
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    required
                  />
                </label>
              </div>
            </div>
            <div className="flex justify-center items-center gap-4 mt-12 pb-4">
              <Button className="border border-yellow-500" onClick={handleSave}>
                Save and Continue
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Step1;
