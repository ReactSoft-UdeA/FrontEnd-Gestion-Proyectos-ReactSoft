import React from "react";
import ReactLoading from "react-loading";

const ButtonLoading = ({ disabled, loading, text, onClick = () => {} }) => {
  return (
    <button
      class="motion-reduce:hidden animate-spin ..." viewBox="0 0 24 24"
      onClick={onClick}
      disabled={disabled}
      type="submit"
      //className=" bg-blue-400  text-white font-bold text-md py-1 px-3  rounded-sm hover:bg-blue-600 shadow-md my-2 disabled:opacity-50 disabled:bg-gray-700"
      className="bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold text-lg py-3 px-6  rounded-xl hover:from-pink-600 hover:to-yellow-600 hadow-md my-2 disabled:bg-gray-700">
      {loading ? <ReactLoading type="spin" height={30} width={30} /> : text}
    </button>
  );
};

export default ButtonLoading;
