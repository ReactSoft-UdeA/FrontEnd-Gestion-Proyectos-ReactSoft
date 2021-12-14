import React from "react";
import PrivateRoute from "components/PrivateRoute";

const CrearInscripcion = () => {
  return (
    <div>
      <PrivateRoute roleList={["ESTUDIANTE"]}>
        <h1 className="text-center display-1 h1 pt-10 ">Inscribir Proyecto</h1>
      </PrivateRoute>
    </div>
  );
};

export default CrearInscripcion;
