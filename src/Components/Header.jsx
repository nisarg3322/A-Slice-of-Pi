/**
 * Author: Nisarg Patel
 * Project: uOttawa Outreach Technical Interview Project
 * Description: This file contains the implementation of Header
 */

import React from "react";

const header = () => {
  return (
    <>
      <h1
        className="text-center text-shadow-lg font-medium  text-4xl font-sans text-slate-700 p-4  shadow-md  hover:shadow-lg hover:shadow-red-500 transition duration-300 ease-in-out "
        style={{
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
        }}
      >
        A Slice of Pi 🍕
      </h1>
    </>
  );
};

export default header;
