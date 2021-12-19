import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_PROYECTOS_INSCRITOS } from "graphql/proyectosEstudiante/queries";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useUser } from "context/userContext";
import PrivateRoute from "components/PrivateRoute";

const IndexProyectosEstudiante = () => {
  const { userData } = useUser();
  const [IdEstudiante, setIdEstudiante] = useState("");

  useEffect(() => {
    setIdEstudiante(userData._id);
  }, [userData]);

  const { data, loading, error, refetch } = useQuery(GET_PROYECTOS_INSCRITOS, {
    variables: {
      id: IdEstudiante,
    },
  });

  useEffect(() => {
    console.log("data servidor ", data);
    refetch();
  }, [data]);

  // useEffect(() => {
  //   if (data) {
  //     toast.success("Inscripción creada con exito");
  //     refetch();
  //   }
  // }, [data]);

  useEffect(() => {
    if (error) {
      toast.error("Error en la consulta de Proyectos");
    }
  }, [error]);

  if (loading) return <h1 className="text-center display-1 h1"> Cargando!!</h1>;

  return (
    <div>
      <PrivateRoute roleList={["ESTUDIANTE"]}>
        <br />
        <br />
        <div className=" bg-gray-100 text-center display-1 h1 pt-15">
          <h1>Mis Proyectos Inscritos </h1>
        </div>
        <div class="container pt-10">
          <table class="table table-striped table-hover align-middle table-bordered ">
            <thead className="tabla">
              <tr>
                <th scope="col" className="text-center">
                  ID Proyecto
                </th>
                <th scope="col" className="text-center">
                  Nombre Proyecto
                </th>
                <th scope="col" className="text-center">
                  Lider
                </th>
                <th scope="col" className="text-center">
                  ID Inscripción
                </th>
                <th scope="col" className="text-center">
                  Estado Inscripción
                </th>
                <th scope="col" className="text-center">
                  Nombre{" "}
                </th>
                <th scope="col" className="text-center">
                  Apellido{" "}
                </th>
                <th scope="col" className="text-center">
                  Opciones
                </th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.ProyectosInscritos.map((u) => {
                  return (
                    <tr key={u._id}>
                      <td class="text-center">{u.proyecto._id.slice(20)}</td>
                      <td class="text-center">{u.proyecto.nombre}</td>
                      <td class="text-center">{u.proyecto.lider.nombre}</td>
                      <td class="text-center">{u._id.slice(20)}</td>
                      <td class="text-center">{u.estado}</td>
                      <td class="text-center">{u.estudiante.nombre}</td>
                      <td class="text-center">{u.estudiante.apellido}</td>
                      <td
                        class="d-flex justify-content-around align-items-center"
                        style={{ color: "#1588B4", height: "65px" }}
                      >
                        {u.estado === "ACEPTADO" && (
                          <Link
                            to={`/proyectosEstudiante/avances/${u.proyecto._id}`}
                          >
                            <button> Ver Avances</button>
                            <i class="fas fa-eye input-group justify-content-around "></i>
                          </Link>
                        )}
                        {u.estado === "ACEPTADO" && (
                          <Link
                            to={`/proyectosEstudiante/nuevoAvance/${u.proyecto._id}`}
                          >
                            <button> Crear Avance</button>
                            <i class="fas fa-pencil-alt input-group justify-content-around "></i>
                          </Link>
                        )}

                        {u.estado === "PENDIENTE" && (
                          <span>Inscripción Pendiente</span>
                        )}
                        {u.estado === "RECHAZADO" && (
                          <span> Inscripción Declinada</span>
                        )}
                      </td>
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
