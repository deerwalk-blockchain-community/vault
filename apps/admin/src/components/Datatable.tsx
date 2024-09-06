"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { FaExpandArrowsAlt } from "react-icons/fa";
import { DialogContent, DialogHeader } from "./ui/dialog";
import Image from "next/image";
import { Button } from "./ui/button";
import { Popover } from "./ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Input } from "./ui/input";
import useSWR from "swr";
import { BASE_URL } from "@/lib/constants";
import { toast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";

const data = [
  {
    Id: "1201",
    Name: "Erlich Bacham",
    Address: "New Baneshwor, Kathmandu",
    Date: "09/02/2024",
    Status: "UNVERIFIED",
    Time: "2 minutes ago",
  },
  {
    Id: "1202",
    Name: "Victor V Doom",
    Address: "Sano Thimi, Bhaktapur",
    Date: "09/02/2024",
    Status: "UNVERIFIED",
    Time: "5 minutes ago",
  },
  {
    Id: "1203",
    Name: "Pranjal Raut",
    Address: "Pokhariya, Biratnagar",
    Date: "09/02/2024",
    Status: "UNVERIFIED",
    Time: "7 minutes ago",
  },
  {
    Id: "1204",
    Name: "Paul McCartney",
    Address: "Fifth Avenue, New York",
    Date: "09/02/2024",
    Status: "UNVERIFIED",
    Time: "11 minutes ago",
  },
  {
    Id: "1205",
    Name: "Pranjal Raut",
    Address: "Pokhariya, Biratnagar",
    Date: "09/02/2024",
    Status: "UNVERIFIED",
    Time: "32 minutes ago",
  },
];

const fetcher = async (url: string, token: string): Promise<any> => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

const Datatable = ({
  limit,
  searchQuery = "",
}: {
  limit?: number;
  searchQuery?: string;
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [displayedData, setDisplayedData] = useState(data);
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);
  const [verdict, setVerdict] = useState<string>("");
  const token = JSON.parse(JSON.stringify(localStorage.getItem("token") || ""));
  // const { data: user_data, error } = useSWR<any>(
  //   `${BASE_URL}/user/${userID}`,
  //   (url: string) => fetcher(url, token || "")
  // );

  useLayoutEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    let filteredData = data;

    if (searchQuery) {
      filteredData = filteredData.filter((item: any) =>
        item.Name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (limit) {
      filteredData = filteredData.slice(0, limit);
    }

    setDisplayedData(filteredData);
  }, [limit, searchQuery, isMounted]);

  const handleExpandClick = (record: any) => {
    setSelectedRecord(record);
  };

  const handleVerdictChange = (e: any) => {
    setVerdict(e.target.value);
  };

  // TODO:REJECT AND ACCEPT
  // const handleReject = async () => {
  //   try {
  //     const response = await fetch(`${BASE_URL}/user/${userID}/kyc`, {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: verdict,
  //     });
  //     toast({
  //       title: "User Accepted successfully",
  //     });
  //   } catch (error) {
  //     toast({
  //       variant: "destructive",
  //       title: "Something went wrong!",
  //       description: `${error}`,
  //       action: <ToastAction altText="Try Again">Try Again</ToastAction>,
  //     });
  //   }
  // };

  // const handleAccept = async () => {
  //   try {
  //     const response = await fetch(`${BASE_URL}/user/${userID}/kyc`, {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       // TODO:Add body
  //       // body:
  //     });
  //     toast({
  //       title: "User Accepted successfully",
  //
  //     });
  //   } catch (error) {
  //     toast({
  //       variant: "destructive",
  //       title: "Something went wrong!",
  //       description: `${error}`,
  //       action: <ToastAction altText="Try Again">Try Again</ToastAction>,
  //     });
  //   }
  // };

  if (!isMounted) return null;

  return (
    <div className="bg-primary w-full p-5 rounded-lg">
      <Table className="disabled:hover">
        <TableHeader>Recent Requests ({displayedData.length})</TableHeader>
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Time</TableHead>
          <TableHead></TableHead>
        </TableRow>
        {displayedData.map((cell: any) => (
          <TableBody key={cell.Id}>
            <TableRow>
              <TableCell>{cell.Id}</TableCell>
              <TableCell>{cell.Name}</TableCell>
              <TableCell>{cell.Address}</TableCell>
              <TableCell>{cell.Date}</TableCell>
              <TableCell>{cell.Status}</TableCell>
              <TableCell>{cell.Time}</TableCell>
              {limit ? null : (
                <TableCell
                  className="hover:cursor-pointer"
                  onClick={() => handleExpandClick(cell)}
                >
                  <FaExpandArrowsAlt />
                </TableCell>
              )}
            </TableRow>
          </TableBody>
        ))}
      </Table>

      {selectedRecord && (
        <Dialog
          open={!!selectedRecord}
          onOpenChange={() => setSelectedRecord(null)}
        >
          <DialogTrigger asChild>
            <div />
          </DialogTrigger>
          <DialogContent className="bg-primary text-white">
            <DialogHeader>User Details</DialogHeader>
            <div className="flex flex-col">
              <div className="flex flex-row">
                <div className="">
                  {/* <Image
                    src={"./src"}
                    alt={selectedRecord.Name}
                    width={50}
                    height={50}
                  /> */}
                  <div className="flex flex-col">
                    <p>{selectedRecord.Name}</p>
                    <p>{selectedRecord.Address}</p>
                    <p>{selectedRecord.Date}</p>
                    <p>{selectedRecord.Status}</p>
                    <p>{selectedRecord.Time}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-5 justify-center">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button className="bg-red-500">Reject</Button>
                  </PopoverTrigger>
                  <PopoverContent className="bg-gray-300 mt-2 p-5">
                    <div className="flex flex-col items-center gap-2">
                      <Input
                        type="text"
                        placeholder="reason"
                        name="verdict"
                        onChange={handleVerdictChange}
                      />
                      <Button
                        type="submit"
                        // onClick={handleReject}
                        className="bg-black"
                      >
                        Submit
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>

                <Button
                  type="submit"
                  className="bg-green-500"
                  // onClick={handlAccept}
                >
                  Accept
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Datatable;
