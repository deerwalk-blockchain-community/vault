import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

const data = [
  {
    id: 1203,
    name: "Erlich Bacham",
    address: "New Baneshwor, Kathmandu",
    date: "09/02/2024",
    status: "Unverified",
  },
  {
    id: 1203,
    name: "Erlich Bacham",
    address: "New Baneshwor, Kathmandu",
    date: "09/02/2024",
    status: "Unverified",
  },
  {
    id: 1203,
    name: "Erlich Bacham",
    address: "New Baneshwor, Kathmandu",
    date: "09/02/2024",
    status: "Unverified",
  },
  {
    id: 1203,
    name: "Erlich Bacham",
    address: "New Baneshwor, Kathmandu",
    date: "09/02/2024",
    status: "Unverified",
  },
];

const Datatable = () => {
  return (
    <div className="bg-red">
      <Table className="disabled:hover">
        <TableHeader>Recent Requests ({data.length})</TableHeader>
        <TableRow className="">
          <TableHead>id</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
        {data.map((cell) => (
          <TableBody>
            <TableRow>
              <TableCell>{cell.id}</TableCell>
              <TableCell>{cell.name}</TableCell>
              <TableCell>{cell.address}</TableCell>
              <TableCell>{cell.date}</TableCell>
              <TableCell>{cell.status}</TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </div>
  );
};

export default Datatable;
