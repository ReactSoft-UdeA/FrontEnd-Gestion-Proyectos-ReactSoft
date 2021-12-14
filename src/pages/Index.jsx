import React from "react";
import Carousel from "components/Carousel";

const Index = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-lg px-6 py-8 ring-1 ring-gray-900/5 shadow-xl">
      {" "}
      <h1 className="text-7xl text-gray-900 text-white font-medium tracking-tight">React Soft</h1>
      {/* <div className="bg-gray-100 h-96">React Soft</div> */}
      <Carousel />
    </div>
  );
};

export default Index;
