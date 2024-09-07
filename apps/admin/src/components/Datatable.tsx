"use client";
import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaExpandArrowsAlt } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";
import { BASE_URL } from "@/lib/constants";
import { toast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";
import useSWR from "swr";

const fetcher = async (url: string, token: string): Promise<any> => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${JSON.parse(token)}`,
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
  const [displayedData, setDisplayedData] = useState<any[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);
  const [verdict, setVerdict] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);

  useLayoutEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("token") || "";
    setToken(storedToken);
  }, []);

  const { data: data, error } = useSWR<any>(
    `${BASE_URL}/user?limit=10&page=1&descending=true`,
    (url: string) => fetcher(url, token || "")
  );
  console.log(data);

  useEffect(() => {
    if (!data || !Array.isArray(data)) {
      setDisplayedData([]);
      return;
    }

    let filteredData = [...data];

    if (searchQuery) {
      filteredData = filteredData.filter((item: any) =>
        (item.kyc.firstName + " " + item.kyc.lastName)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }

    if (limit && filteredData.length > limit) {
      filteredData = filteredData.slice(0, limit);
    }

    if (JSON.stringify(filteredData) !== JSON.stringify(displayedData)) {
      setDisplayedData(filteredData);
    }
  }, [data, limit, searchQuery]);

  const handleExpandClick = (record: any) => {
    setSelectedRecord(record);
  };

  const handleVerdictChange = (e: any) => {
    setVerdict(e.target.value);
  };

  const handleReject = async (userID: string) => {
    try {
      const response = await fetch(`${BASE_URL}/user/${userID}/kyc`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
        body: JSON.stringify({
          verdict: "REJECTED",
          reason: verdict,
        }),
      });
      if (!response.ok) {
        throw new Error("Query Failed");
      }
      toast({
        title: "User Rejected successfully",
      });

      setDisplayedData((prevData) =>
        prevData.filter((item) => item.kyc.id !== userID)
      );
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong!",
        description: `${error}`,
        action: <ToastAction altText="Try Again">Try Again</ToastAction>,
      });
    }
  };

  const handleAccept = async (userID: string) => {
    try {
      const response = await fetch(`${BASE_URL}/user/${userID}/kyc`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
        body: JSON.stringify({
          verdict: "ACCEPTED",
        }),
      });
      if (!response.ok) {
        throw new Error("Query Failed");
      }
      toast({
        title: "User Accepted successfully",
      });

      setDisplayedData((prevData) =>
        prevData.map((item) =>
          item.kyc.id === userID
            ? { ...item, kyc: { ...item.kyc, status: "ACCEPTED" } }
            : item
        )
      );
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong!",
        description: `${error}`,
        action: <ToastAction altText="Try Again">Try Again</ToastAction>,
      });
    }
  };

  if (!isMounted) return null;

  return (
    <div className="bg-primary w-full p-5 rounded-lg">
      <Table className="disabled:hover">
        <TableHeader>Recent Requests ({displayedData?.length})</TableHeader>
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead></TableHead>
        </TableRow>
        {!data ? (
          <div>Loading....</div>
        ) : (
          displayedData?.map((cell: any, index: number) => (
            <TableBody key={index}>
              <TableRow>
                <TableCell>{cell?.kyc?.id}</TableCell>
                <TableCell>
                  {cell?.kyc?.firstName + " " + cell?.kyc?.lastName}
                </TableCell>
                <TableCell>{cell?.kyc?.address}</TableCell>
                <TableCell>
                  {new Date(cell?.kyc?.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>{cell?.kyc?.status}</TableCell>
                {!limit ? (
                  <TableCell
                    className="hover:cursor-pointer"
                    onClick={() => handleExpandClick(cell)}
                  >
                    <FaExpandArrowsAlt />
                  </TableCell>
                ) : null}
              </TableRow>
            </TableBody>
          ))
        )}
      </Table>

      {selectedRecord && (
        <Dialog
          open={!!selectedRecord}
          onOpenChange={() => setSelectedRecord(null)}
        >
          <DialogTrigger asChild>
            <div />
          </DialogTrigger>
          <DialogContent className="bg-white text-black">
            <DialogHeader>User Details</DialogHeader>
            <div className="flex flex-col">
              <div className="flex flex-row">
                <div className="flex flex-col">
                  <p>
                    {selectedRecord.kyc.firstName} {selectedRecord.kyc.lastName}{" "}
                    {selectedRecord.id}
                  </p>
                  <p>{selectedRecord.kyc.address}</p>
                  <p>
                    {new Date(
                      selectedRecord.kyc.createdAt
                    ).toLocaleDateString()}
                  </p>
                  <p>{selectedRecord.kyc.status}</p>
                </div>
              </div>
              <div className="flex gap-5 justify-center">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button className="bg-red-500">Reject</Button>
                  </PopoverTrigger>
                  <PopoverContent className="bg-gray-300 mt-2 p-5">
                    <form
                      onSubmit={() => handleReject(selectedRecord.id)}
                      className="flex flex-col items-center gap-2"
                    >
                      <Input
                        type="text"
                        placeholder="reason"
                        name="verdict"
                        onChange={handleVerdictChange}
                        required
                      />
                      <Button type="submit" className="bg-black text-white">
                        Submit
                      </Button>
                    </form>
                  </PopoverContent>
                </Popover>

                <Button
                  type="submit"
                  className="bg-green-500"
                  onClick={() => handleAccept(selectedRecord.kyc.id)}
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
