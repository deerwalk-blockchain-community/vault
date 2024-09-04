"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useState, useEffect, useLayoutEffect } from "react";

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
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </div>
  );
};

export default Datatable;
