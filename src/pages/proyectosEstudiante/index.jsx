// import React from "react";
// import PrivateRoute from "components/PrivateRoute";

// const IndexProyectosEstudiante = () => {
//   return (
//     <div>
//       <PrivateRoute roleList={["ESTUDIANTE"]}>
//         <h1 className="text-center display-1 h1 pt-10 ">
//           Traer Proyectos Inscritos Estudiante
//         </h1>
//       </PrivateRoute>
//     </div>
//   );
// };

// export default IndexProyectosEstudiante;

import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_PROYECTOS_INSCRITOS } from "graphql/proyectosEstudiante/queries";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import { useUser } from "context/userContext";
import PrivateRoute from "components/PrivateRoute";

const IndexProyectosEstudiante = () => {
  const { userData } = useUser();
  const [IdEstudiante, setIdEstudiante] = useState("");

  useEffect(() => {
    // const liderId = '"' + userData._id + '"';
    // console.log("IdFront", liderId);
    setIdEstudiante(userData._id);
    // console.log("IdState", IdLider);
  }, [userData]);

  //   setIdLider(userData._id);
  //   console.log("IdState2", IdLider);

  //FUNCION PARA TRAER PROYECTOS POR LIDER
  const { data, loading, error } = useQuery(GET_PROYECTOS_INSCRITOS, {
    // variables: {
    //   id: "61b79c8acab37ce3d6d26400",
    // },
    variables: {
      id: IdEstudiante,
    },
  });

  useEffect(() => {
    console.log("data servidor ", data);
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error("Error en la consulta de Proyectos");
    }
  }, [error]);

  if (loading) return <h1 className="text-center display-1 h1"> Cargando!!</h1>;

  return (
    <div>
      <PrivateRoute roleList={["ESTUDIANTE"]}>
        <h1 class="text-center display-1 h1 pt-10">Mis Proyectos Inscritos</h1>
        <div class="container pt-10">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">ID INSCRIPCION</th>
                <th scope="col">ID PROYECTO</th>
                <th scope="col">NOMBRE PROYECTO</th>
                <th scope="col">ESTADO INSCRIPCION</th>
                <th scope="col">NOMBRE </th>
                <th scope="col">APELLIDO </th>
                <th scope="col">OPCIONES</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.ProyectosInscritos.map((u) => {
                  return (
                    <tr key={u._id}>
                      <td class="text-center">{u._id.slice(20)}</td>
                      <td class="text-center">{u.proyecto._id.slice(20)}</td>
                      <td class="text-center">{u.proyecto.nombre}</td>
                      <td class="text-center">{u.estado}</td>
                      <td class="text-center">{u.estudiante.nombre}</td>
                      <td class="text-center">{u.estudiante.apellido}</td>
                      {/* <td
                        class="d-flex justify-content-around align-items-center"
                        style={{ color: "red", height: "75px" }}
                      >
                        <Link to={`/proyectosLider/detalle/${u._id}`}>
                          <i class="fas fa-eye input-group justify-content-around "></i>
                        </Link>
                        <Link to={`/proyecto/mostrar/${u._id}`}>
                          <i class="fas fa-pen input-group justify-content-around "></i>
                        </Link>
                      </td> */}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </PrivateRoute>
    </div>
  );
};

export default IndexProyectosEstudiante;
