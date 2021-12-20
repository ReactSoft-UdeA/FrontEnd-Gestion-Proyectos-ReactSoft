// import React from "react";
// import PrivateRoute from "components/PrivateRoute";

// const IndexProyectosLider = () => {
//   return (
//     <div>
//       <PrivateRoute roleList={["LIDER"]}>
//         <h1 className="text-center display-1 h1 pt-10 ">
//           Traer Proyectos Lider
//         </h1>
//       </PrivateRoute>
//     </div>
//   );
// };

// export default IndexProyectosLider;

import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_PROYECTOS_LIDER } from "graphql/proyectosLider/queries";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import { useUser } from "context/userContext";
import PrivateRoute from "components/PrivateRoute";

const IndexProyectosLider = () => {
  //   const { _id } = useParams();

  const { userData } = useUser();
  const [IdLider, setIdLider] = useState("");

  useEffect(() => {
    // const liderId = '"' + userData._id + '"';
    // console.log("IdFront", liderId);
    setIdLider(userData._id);
    // console.log("IdState", IdLider);
  }, [userData]);

  //   setIdLider(userData._id);
  //   console.log("IdState2", IdLider);

  //FUNCION PARA TRAER PROYECTOS POR LIDER
  const { data, loading, error } = useQuery(GET_PROYECTOS_LIDER, {
    // variables: {
    //   id: "61b79c8acab37ce3d6d26400",
    // },
    variables: {
      id: IdLider,
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
    <div class="bg-gradient-to-r from-blue-500 to-green-500 rounded-lg px-6 py-8 ring-1 ring-gray-900/5 shadow-xl">
    <div>
      <PrivateRoute roleList={["LIDER"]}>
      <div className='flex w-full items-center justify-center'>
          <h1 className='text-7xl text-gray-900 text-white font-medium tracking-tight'>Mis Proyectos</h1>
        </div>
        <div class="container pt-10">
          <table class="table table-success table-striped table-hover align-middle table-bordered ">
            <thead>
              <tr>
                <th scope="col">ID PROYECTO</th>
                <th scope="col">NOMBRE PROYECTO</th>
                <th scope="col">PRESUPUESTO</th>
                <th scope="col">INICIO</th>
                <th scope="col">FIN</th>
                <th scope="col">FASE</th>
                <th scope="col">ESTADO</th>
                <th scope="col">LIDER</th>
                <th scope="col">OPCIONES</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.ProyectosPorLider.map((u) => {
                  return (
                    <tr key={u._id}>
                      {/* <th scope="row" className="text-center">{u._id.slice(20)}</th> */}
                      <td class="text-center">{u._id.slice(20)}</td>
                      <td class="text-center">{u.nombre}</td>
                      <td class="text-center">{u.presupuesto}</td>
                      <td class="text-center">{u.fechaInicio}</td>
                      <td class="text-center">{u.fechaFin}</td>
                      <td class="text-center">{u.fase}</td>
                      <td class="text-center">{u.estado}</td>
                      <td className="text-center">{u.lider.apellido}</td>
                      <td
                        class="d-flex justify-content-around align-items-center"
                        style={{ color: "red", height: "75px" }}
                      >
                        <Link to={`/proyectosLider/detalle/${u._id}`}>
                          <i class="fas fa-eye input-group justify-content-around "></i>
                        </Link>
                        {/* <Link to={`/proyecto/mostrar/${u._id}`}>
                          <i class="fas fa-pen input-group justify-content-around "></i>
                        </Link> */}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </PrivateRoute>
    </div>
    </div>
  );
};

export default IndexProyectosLider;
