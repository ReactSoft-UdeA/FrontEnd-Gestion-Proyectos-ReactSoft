import React from "react";
import ReactLoading from "react-loading";

const ButtonLoading = ({ disabled, loading, text, onClick = () => {} }) => {
  return (
    <button
      class="motion-reduce:hidden animate-spin ..." viewBox="0 0 24 24"
      onClick={onClick}
      disabled={disabled}
      type="submit"
      //className="bg-indigo-700 text-white font-bold text-lg py-3 px-6  rounded-xl hover:bg-indigo-500 shadow-md my-2 disabled:opacity-50 disabled:bg-gray-700"
      className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold text-lg py-3 px-6  rounded-xl hover:from-pink-500 hover:to-yellow-500 hadow-md my-2 disabled:opacity-50 disabled:bg-gray-700">
      {loading ? <ReactLoading type="spin" height={30} width={30} /> : text}
    </button>
  );
};

export default ButtonLoading;