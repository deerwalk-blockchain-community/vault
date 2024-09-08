import React, { Children } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CardComponent = ({
  header,
  children,
}: {
  header: string;
  children: React.ReactNode;
}) => {
  return (
    <Card className="bg-[#1A1B1D] border-none text-white min-h-48 lg:max-h-80">
      <CardHeader className="lg:mb-5">
        <CardTitle>{header}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CardComponent;
