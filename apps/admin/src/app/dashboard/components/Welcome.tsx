import React from "react";

const Welcome = ({ name }: { name: string }) => {
  return (
    <div>
      <p>
        Welcome <span className="block text-2xl font-semibold">{name}</span> Are
        you Ready to get the work done?
      </p>
    </div>
  );
};

export default Welcome;
