import React from "react";
import PrivateRoute from "components/PrivateRoute";

const IndexProyectosLider = () => {
  return (
    <div>
      <PrivateRoute roleList={["LIDER"]}>
        <h1 className="text-center display-1 h1 pt-10 ">
          Traer Proyectos Lider
        </h1>
      </PrivateRoute>
    </div>
  );
};

export default IndexProyectosLider;
