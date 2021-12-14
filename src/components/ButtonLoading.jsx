import React from "react";
import ReactLoading from "react-loading";

const ButtonLoading = ({ disabled, loading, text, onClick = () => {} }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="submit"
      className="btn btn-primary my-3"
    >
      {loading ? <ReactLoading type="spin" height={30} width={30} /> : text}
    </button>
  );
};

export default ButtonLoading;
