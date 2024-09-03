import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Profile = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="absolute right-0 flex gap-2 max-h-16 items-center">
          <div className="border border-[#fcfc03] rounded-[50%] w-16 h-16">
            <Image
              src={"/apps/user/public/images/aashish.jpg"}
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
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-inherit text-white">
        <DropdownMenuItem>
          Settings
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Logout
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
