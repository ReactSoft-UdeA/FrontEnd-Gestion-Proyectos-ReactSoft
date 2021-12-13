import React from "react";
import PrivateRoute from "components/PrivateRoute";

const IndexProyectosEstudiante = () => {
  return (
    <div>
      <PrivateRoute roleList={["ESTUDIANTE"]}>
        <h1 className="text-center display-1 h1 pt-10 ">
          Traer Proyectos Estudiante ID
        </h1>
      </PrivateRoute>
    </div>
  );
};

export default IndexProyectosEstudiante;
