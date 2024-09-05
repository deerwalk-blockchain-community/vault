import Image from "next/image";

const DashboardOverview = () => {
  return (
    <div>
      <h1 className="text-2xl mt-12">Dashboard Overview</h1>
      <h1>Test</h1>
      <div className="flex flex-row gap-4 mt-4">
        <div className="bg-[#1a1b1d] py-6 px-8 flex gap-4 rounded-xl">
          <div className="w-[150px]">
            <Image
              src={"/images/damn.jpg"}
              alt="Dashboard Profile Image"
              width={500}
              height={500}
              className="object-cover rounded-[50%] aspect-square"
            />
          </div>
          <div className="m-auto">
            <div>
              <p>First Name</p>
              <p className="text-gray-400">Erlich</p>
            </div>
            <div>
              <p>Last Name</p>
              <p className="text-gray-400">Bachman</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 ">
          <div className="bg-[#1a1b1d] px-5 pt-4 rounded-xl h-1/2 m-auto">
            <p className="text-gray-400">Account Created</p>
            <p className="text-2xl">2024-08-29</p>
          </div>
          <div className="bg-[#1a1b1d] px-5 pt-4 rounded-xl h-1/2">
            <p className="text-gray-400">Account Status</p>
            <p className="text-2xl">Verified</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
