import React, { useEffect } from "react";
import PrivateRoute from "components/PrivateRoute";
import { useQuery } from "@apollo/client";
import { GET_PROYECTOS_USUARIO } from "graphql/proyectosEstudiante/queries";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const IndexProyectosDisponibles = () => {
  const { data, error, loading } = useQuery(GET_PROYECTOS_USUARIO);

  useEffect(() => {
    console.log("data servidor ", data);
  }, [data]);

  // sacar error de validacion de ususarios
  useEffect(() => {
    if (error) {
      toast.error("Error en la consulta de Proyectos");
    }
  }, [error]);

  if (loading)
    return <h1 className="text-center display-1 h1 "> Cargando!!</h1>;

  return (
    <div>
      <PrivateRoute roleList={["ESTUDIANTE"]}>
        <h1 className="text-center display-1 h1 pt-10 ">
          Proyectos Disponibles
        </h1>
        <div className="container pt-10">
          <table className="table table-striped table-hover align-middle table-bordered ">
            <thead className="tabla">
              <tr className="">
                <th scope="col" className="text-center">
                  ID
                </th>
                <th scope="col" className="text-center">
                  Nombre
                </th>
                <th scope="col" className="text-center">
                  Presupuesto
                </th>
                <th scope="col" className="text-center">
                  Fecha Inicio
                </th>
                <th scope="col" className="text-center">
                  Fecha Fin
                </th>
                <th scope="col" className="text-center">
                  Estado
                </th>
                <th scope="col" className="text-center">
                  Fase
                </th>
                <th scope="col" className="text-center">
                  Lider
                </th>
                <th scope="col" className="text-center">
                  Correo
                </th>
                <th scope="col" className="text-center">
                  Opciones
                </th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.Proyectos.map((u) => {
                  return (
                    <tr key={u._id}>
                      <th scope="row" className="text-center">
                        {u._id.slice(20)}
                      </th>
                      {/* <td className="text-center">{u._id.slice(20)}</td> */}
                      <td className="text-center">{u.nombre}</td>
                      <td className="text-center">{u.presupuesto}</td>
                      <td className="text-center">
                        {u.fechaInicio.slice(0, 10)}
                      </td>
                      <td className="text-center">{u.fechaFin.slice(0, 10)}</td>
                      <td className="text-center">{u.estado}</td>
                      <td className="text-center">{u.fase}</td>
                      <td className="text-center">{u.lider.nombre}</td>
                      <td className="text-center">{u.lider.correo}</td>
                      <td
                        class="d-flex justify-content-around align-items-center"
                        style={{ color: "#1588B4", height: "75px" }}
                      >
                        {u.estado === "ACTIVO" && (
                          <Link
                            to={`/proyectosEstudiante/inscripcion/${u._id}`}
                          >
                            <button> Inscribirme </button>
                            <i className="fas fa-calendar-check input-group justify-content-around "></i>
                          </Link>
                        )}
                        {u.estado === "INACTIVO" && (
                          <span>Proyecto Inactivo</span>
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

export default IndexProyectosDisponibles;
