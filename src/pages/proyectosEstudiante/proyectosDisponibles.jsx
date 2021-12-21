import React, { useEffect, useState } from "react";
import PrivateRoute from "components/PrivateRoute";
import { useMutation, useQuery } from "@apollo/client";
import { useUser } from "context/userContext";
import { PROYECTOS } from "graphql/proyectosEstudiante/queries";
import { CREAR_INSCRIPCION } from "graphql/proyectosEstudiante/mutations";
import { toast } from "react-toastify";
import ButtonLoading from "components/ButtonLoading";

const IndexProyectosDisponibles = () => {
  const { data, error, loading } = useQuery(PROYECTOS);

  useEffect(() => {
    console.log("data servidor ", data);
    // refetch();
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error("Error en la consulta de Proyectos");
    }
  }, [error]);

  const InscripcionProyecto = ({ idProyecto, estado, inscripciones }) => {
    const [estadoInscripcion, setEstadoInscripcion] = useState("");
    const [crearInscripcion, { data, loading }] =
      useMutation(CREAR_INSCRIPCION);
    const { userData } = useUser();

    useEffect(() => {
      if (userData && inscripciones) {
        const flt = inscripciones.filter(
          (el) => el.estudiante._id === userData._id
        );
        if (flt.length > 0) {
          setEstadoInscripcion(flt[0].estado);
        }
      }
    }, [userData, inscripciones]);

    useEffect(() => {
      if (data) {
        toast.success("Inscripción creada con exito");
        //refetch();
      }
    }, [data]);

    const confirmarInscripcion = () => {
      crearInscripcion({
        variables: { proyecto: idProyecto, estudiante: userData._id },
      });
    };

    return (
      <>
        {estadoInscripcion !== "" ? (
          <span className="text-center">
            Estado de <br /> inscripción: <br /> "{estadoInscripcion}"
          </span>
        ) : (
          <ButtonLoading
            onClick={() => confirmarInscripcion()}
            disabled={estado === "INACTIVO"}
            loading={loading}
            text="Inscribirme"
            className=" bg-black"
          />
        )}
      </>
    );
  };

  if (loading)
    return <h1 className="text-center display-1 h1 "> Cargando!!</h1>;

  return (
    <div class="bg-gradient-to-r from-blue-500 to-green-500 rounded-lg px-6 py-8 ring-1 ring-gray-900/5 shadow-xl">
      <div>
        <PrivateRoute roleList={["ESTUDIANTE"]}>
          <h1 className="text-7xl text-gray-900 text-white font-medium tracking-tight text-center">
            Proyectos Disponibles
          </h1>
          <div className="container pt-10">
            <table className="table table-success table-striped table-hover align-middle table-bordered  ">
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
                        <td className="text-center">{u.nombre}</td>
                        <td className="text-center">{u.presupuesto}</td>
                        <td className="text-center">
                          {u.fechaInicio.slice(0, 10)}
                        </td>
                        <td className="text-center">
                          {u.fechaFin.slice(0, 10)}
                        </td>
                        <td className="text-center">{u.estado}</td>
                        <td className="text-center">{u.fase}</td>
                        <td className="text-center">{u.lider.nombre}</td>
                        <td className="text-center">{u.lider.correo}</td>
                        <td
                          class="d-flex justify-content-around align-items-center"
                          style={{ color: "#1588B4", height: "75px" }}
                        >
                          {u.estado === "ACTIVO" && (
                            <InscripcionProyecto
                              idProyecto={u._id}
                              estado={u.estado}
                              inscripciones={u.inscripciones}
                            />
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
    </div>
  );
};

export default IndexProyectosDisponibles;
