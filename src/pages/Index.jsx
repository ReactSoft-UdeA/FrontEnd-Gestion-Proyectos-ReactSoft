import React from "react";
import Carousel from "components/Carousel";

const Index = () => {
  return (
    <div class="bg-gradient-to-r from-blue-500 to-green-500 rounded-lg px-6 py-8 ring-1 ring-gray-900/5 shadow-xl">
    <div className="bg-gray-100 h-100">
      {" "}
      <h1 className="text-center h1">React Soft</h1>
      {/* <div className="bg-gray-100 h-96">React Soft</div> */}
      <Carousel />
    </div>
    </div>
  );
};

export default Index;
