import React from "react";

const Welcome = ({ name }: { name: string }) => {
  return (
    <div>
      <p>
        Welcome <span className="block text-2xl font-semibold">{name}</span>
        Check out the active stats.....
      </p>
    </div>
  );
};

export default Welcome;
