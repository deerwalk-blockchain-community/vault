import Image from "next/image";

const Profile = () => {
  return (
    <div className="absolute right-0 flex gap-2 max-h-20 items-center ">
      <div className="border border-[#fcfc03] rounded-[50%] w-16 h-16">
        <Image
          src={"/images/aashish.jpg"}
          alt="Profile Image"
          width={100}
          height={100}
        />
      </div>
      <div>
        <p className="text-gray-500 text-sm">@victor</p>
        <p className="text-white">Von Doom</p>
      </div>
    </div>
  );
};

export default Profile;
