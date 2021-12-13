import React from "react";
import PrivateRoute from "components/PrivateRoute";

const IndexProyectosAdmin = () => {
  return (
    <div>
      <PrivateRoute roleList={["ADMINISTRADOR"]}>
        <h1 className="text-center display-1 h1 pt-10 ">
          Traer Proyectos Administrador
        </h1>
      </PrivateRoute>
    </div>
  );
};

export default IndexProyectosAdmin;
