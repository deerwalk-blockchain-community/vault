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

  useLayoutEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    let filteredData = data;

    if (searchQuery) {
      filteredData = filteredData.filter((item) =>
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
        {displayedData.map((cell) => (
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
                      <Input type="text" placeholder="reason" />
                      <Button type="submit" className="bg-black">
                        Submit
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
                <Button className="bg-green-500">Accept</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Datatable;
