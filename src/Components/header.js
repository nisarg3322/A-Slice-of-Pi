import React from "react";

const header = () => {
  return (
    <>
      <h1
        className="text-center text-shadow-lg font-medium mb-8 text-4xl font-sans  p-4 text-slate-700 shadow-md  hover:shadow-lg hover:shadow-red-500 transition duration-300 ease-in-out "
        style={{
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
        }}
      >
        Pizza Restaurant Statistics
      </h1>
    </>
  );
};

export default header;
