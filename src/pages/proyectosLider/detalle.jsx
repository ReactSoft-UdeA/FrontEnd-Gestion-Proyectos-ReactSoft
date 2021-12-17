// import React from "react";
// import PrivateRoute from "components/PrivateRoute";

// const ProyectosDetalle = () => {
//   return (
//     <div>
//       <PrivateRoute roleList={["LIDER"]}>
//         <h1 className="text-center display-1 h1 pt-10 ">
//           Detalles del Proyecto
//         </h1>
//       </PrivateRoute>
//     </div>
//   );
// };

// export default ProyectosDetalle;

import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { GET_PROYECTOS_DETALLE } from "graphql/proyectosLider/queries";
import PrivateRoute from "components/PrivateRoute";
import {
  APROBAR_INSCRIPCION,
  RECHAZAR_INSCRIPCION,
} from "graphql/inscripciones/mutaciones";
import ButtonLoading from "components/ButtonLoading";

const ProyectosDetalle = () => {
  const { _id } = useParams();

  /* const {data: queryData, error: queryError, loading: queryLoading} = useQuery(GET_USUARIO, {
        variables: {_id},
    }); */

  const {
    data: queryData2,
    error: queryError,
    loading: queryLoading2,
  } = useQuery(GET_PROYECTOS_DETALLE, {
    variables: { _id },
  });

  /* useEffect(() => {
        if (mutationData) {
          toast.success('El Usuario se editó Exitosamente!!');
        }
      }, [mutationData]);

    useEffect(() => {
    if (mutationError) {
        toast.error('Error modificando el usuario');
    }

    if (queryError) {
        toast.error('Error consultando el usuario');
    }
    }, [queryError, mutationError]);
  */

  const [
    aprobarInscripcion,
    {
      data: aprobarData,
      loading: aprobarLoading,
      error: aprobarError,
      refetch,
    },
  ] = useMutation(APROBAR_INSCRIPCION);

  const cambiarEstadoInscripcion = (idInscripcion) => {
    aprobarInscripcion({
      variables: {
        aprobarInscripcionId: idInscripcion,
      },
    });
  };

  useEffect(() => {
    if (aprobarData) {
      toast.success("Inscripcion aprobada con exito");
      // refetch();
    }
  }, [aprobarData]);

  useEffect(() => {
    if (aprobarError) {
      toast.error("Error aprobando la inscripcion");
    }
  }, [aprobarError]);

  const [
    rechazarInscripcion,
    { data: rechazarData, loading: rechazarLoading, error: rechazarError },
  ] = useMutation(RECHAZAR_INSCRIPCION);

  const cambiarRechazoInscripcion = (idInscripcion) => {
    rechazarInscripcion({
      variables: {
        rechazarInscripcionId: idInscripcion,
      },
    });
  };

  useEffect(() => {
    if (rechazarData) {
      toast.success("Inscripcion Rechazada con exito");
      // refetch();
    }
  }, [rechazarData]);

  useEffect(() => {
    if (rechazarError) {
      toast.error("Error rechazando la inscripcion");
    }
  }, [rechazarError]);

  if (rechazarLoading)
    return <h1 className="text-center display-1 h1"> Cargando!!</h1>;

  if (aprobarLoading)
    return <h1 className="text-center display-1 h1"> Cargando!!</h1>;

  if (queryLoading2)
    return <h1 className="text-center display-1 h1"> Cargando!!</h1>;

  return (
    <div>
      <PrivateRoute roleList={["LIDER"]}>
        <div class="col-lg-11 m-10 d-flex flex-wrap align-items-start">
          <button type="button" class="btn btn-outline-primary">
            <Link to="/proyectosLider/index">Atras </Link>
          </button>
          <br />
          <br />
          <h2 class="col-lg-12 mb-3 bg-info p-1">
            <strong>PROYECTO SELECCIONADO</strong>
          </h2>
          <div class="accordion col-lg-12" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingOne">
                <button
                  class="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  PROYECTO
                </button>
              </h2>
              <div
                id="collapseOne"
                class="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body d-flex flex-wrap">
                  <div class="mb-3 col-lg-3 m-3">
                    <label for="exampleFormControlInput1" class="form-label">
                      Id Proyecto
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      value={_id}
                      disabled
                    />
                  </div>
                  <div class="mb-3 col-lg-3 m-3">
                    <label for="exampleFormControlInput1" class="form-label">
                      Nombre proyecto
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      value={queryData2.ProyectosPorId[0].nombre}
                    />
                  </div>
                  <div class="mb-3 col-lg-3 m-3">
                    <label for="exampleFormControlInput1" class="form-label">
                      Presupuesto
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      value={queryData2.ProyectosPorId[0].presupuesto}
                    />
                  </div>
                  <div class="mb-3 col-lg-3 m-3">
                    <label for="exampleFormControlInput1" class="form-label">
                      Fecha inicio
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      value={queryData2.ProyectosPorId[0].fechaInicio}
                      disabled
                    />
                  </div>
                  <div class="mb-3 col-lg-3 m-3">
                    <label for="exampleFormControlInput1" class="form-label">
                      Fecha fin
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      value={queryData2.ProyectosPorId[0].fechaFin}
                      disabled
                    />
                  </div>
                  <div class="mb-3 col-lg-3 m-3">
                    <label for="exampleFormControlInput1" class="form-label">
                      Estado
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      value={queryData2.ProyectosPorId[0].estado}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingTwo">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  OBJETIVOS
                </button>
              </h2>
              <div
                id="collapseTwo"
                class="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">ID OBJETIVO</th>
                        <th scope="col">TIPO</th>
                        <th scope="col">DESCRIPCIÓN</th>
                      </tr>
                    </thead>
                    <tbody>
                      {queryData2 &&
                        queryData2.ProyectosPorId[0].objetivos.map((u) => {
                          return (
                            <tr key={u._id}>
                              <td class="text-center">{u._id.slice(20)}</td>
                              <td class="text-center">{u.tipo}</td>
                              <td class="text-center">{u.descripcion}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingThree">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  AVANCES
                </button>
              </h2>
              <div
                id="collapseThree"
                class="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <table className="table table-striped table-hover align-middle table-bordered bg-gray-100">
                    <thead className="tabla">
                      <tr>
                        <th scope="col" className="text-center ">
                          ID OBJETIVO
                        </th>
                        {/* <th scope="col">TIPO</th> */}
                        <th scope="col" className="text-center">
                          DESCRIPCIÓN
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {queryData2 &&
                        queryData2.ProyectosPorId[0].avances.map((u) => {
                          return (
                            <tr key={u._id}>
                              <td class="text-center">{u._id.slice(20)}</td>
                              {/* <td class="text-center">{u.fechaAvance}</td> */}
                              <td class="text-center">{u.descripcion}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div class="accordion-item">
              <h2 class="accordion-header" id="headingFour">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                  aria-expanded="false"
                  aria-controls="collapseFour"
                >
                  INSCRIPCIONES
                </button>
              </h2>
              <div
                id="collapseFour"
                class="accordion-collapse collapse"
                aria-labelledby="headingFour"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">ID INSCRIPCIÓN</th>
                        <th scope="col">ESTUDIANTE</th>
                        <th scope="col">FECHA INGRESO</th>
                        <th scope="col">ESTADO</th>
                        <th scope="col">OPCIONES</th>
                      </tr>
                    </thead>
                    <tbody>
                      {queryData2 &&
                        queryData2.ProyectosPorId[0].inscripciones.map((u) => {
                          return (
                            <tr key={u._id}>
                              <td class="text-center align-middle">
                                {u._id.slice(20)}
                              </td>
                              <td class="text-center align-middle">
                                {[
                                  u.estudiante._id.slice(20),
                                  " - ",
                                  u.estudiante.nombre,
                                  " ",
                                  u.estudiante.apellido,
                                  " - ",
                                  u.estudiante.correo,
                                ]}
                              </td>
                              <td class="text-center align-middle">
                                {u.fechaIngreso}
                              </td>
                              <td class="text-center align-middle">
                                {u.estado}
                              </td>
                              <td class="text-center">
                                {u.estado === "PENDIENTE" && (
                                  <ButtonLoading
                                    onClick={() => {
                                      cambiarEstadoInscripcion(u._id);
                                    }}
                                    text="Aceptar"
                                    loading={false}
                                    disabled={false}
                                  />
                                )}
                                {u.estado === "RECHAZADO" && (
                                  <ButtonLoading
                                    onClick={() => {
                                      cambiarEstadoInscripcion(u._id);
                                    }}
                                    text="Aceptar"
                                    loading={false}
                                    disabled={false}
                                  />
                                )}
                                {u.estado === "ACEPTADO" && (
                                  <ButtonLoading
                                    onClick={() => {
                                      cambiarRechazoInscripcion(u._id);
                                    }}
                                    text="Rechazar"
                                    loading={false}
                                    disabled={false}
                                  />
                                )}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PrivateRoute>
    </div>
  );
};

export default ProyectosDetalle;
