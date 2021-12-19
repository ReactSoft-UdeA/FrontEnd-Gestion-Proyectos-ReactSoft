import React from "react";
import ReactLoading from "react-loading";

const ButtonLoading = ({ disabled, loading, text, onClick = () => {} }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="submit"
      className=" bg-blue-400  text-white font-bold text-md py-1 px-3  rounded-sm hover:bg-blue-600 shadow-md my-2 disabled:opacity-50 disabled:bg-gray-700"
    >
      {loading ? <ReactLoading type="spin" height={30} width={30} /> : text}
    </button>
  );
};

export default ButtonLoading;
