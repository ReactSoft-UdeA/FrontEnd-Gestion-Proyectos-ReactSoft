import React, {useEffect } from "react";
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
import {EDITAR_PROYECTO_LIDER} from "graphql/proyectosLider/mutations"
import {ADD_OBSERVACION_AVANCE} from "graphql/proyectosLider/mutations"
import {EDITAR_OBJETIVO} from "graphql/proyectosLider/mutations"
import useFormData from "hooks/useFormData";
import { useNavigate } from "react-router";

const ProyectosDetalle = () => {

  const navigate = useNavigate();
  const { form, formData, updateFormData } = useFormData(null);
  const { _id } = useParams();
  
  /* const {data: queryData, error: queryError, loading: queryLoading} = useQuery(GET_USUARIO, {
        variables: {_id},
    }); */

    const [
      editarProyecto,
      { data: mutationData3, loading: mutationLoading3, error: mutationError3 },
    ] = useMutation(EDITAR_PROYECTO_LIDER);
    
    // agregar observación
    const [
      editarAvanceObs,
      { data: mutationData4, loading: mutationLoading4, error: mutationError4 },
    ] = useMutation(ADD_OBSERVACION_AVANCE);
    
    const [
      editarObjetivo,
      { data: mutationData5, loading: mutationLoading5, error: mutationError5 },
    ] = useMutation(EDITAR_OBJETIVO);
  
    useEffect(() => {
      if (mutationData3) {
          
        inhabilitarInputs();
        toast.success('El proyecto se editó Exitosamente!!');
        /* formData=0 */
  
      }
    }, [mutationData3]);

    useEffect(() => {
      if (mutationData4) {
        toast.success('Avance agregado Exitosamente!!');
      }
    }, [mutationData4]);


  const {
    data: queryData2,
    error: queryError,
    loading: queryLoading2, refetch,
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
      refetch();
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
      refetch();
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

  const habilitarEdicionProyecto = ()=>{
    document.querySelector(".editElement").disabled=false;
    document.querySelector(".editElement2").disabled=false;
    document.querySelector("#BtnEditar").style.display='none';
    document.querySelector("#btnGuardarProyecto").style.display='block';
  }

  const submitForm = (e)=>{
    e.preventDefault();
    formData.presupuesto = parseFloat(formData.presupuesto);
    console.log(formData);
    editarProyecto({
        variables: { _id, ...formData },
      });
  }

 

  const inhabilitarInputs = ()=>{
    document.querySelector(".editElement").disabled=true;
    document.querySelector(".editElement2").disabled=true;
    document.querySelector("#BtnEditar").style.display='block';
    document.querySelector("#btnGuardarProyecto").style.display='none';
   }    

   // adicionar observaciones
   const obtenerAvance = (e)=>{
      document.querySelector("#idAvance").value = e.target.value;
      document.querySelector("#idAvanceInput").value = '';
   }


   const guardarObservacionAvance = ()=>{
    let _id = (document.querySelector("#idAvance").value).toString();
    let observaciones = (document.querySelector("#idAvanceInput").value).toString();
    editarAvanceObs({
      variables: { _id, observaciones },
    })
   }

  return (
    <div>

{/* <!-- Modal --> */}
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">REGISTRO DE OBSERVACIONES</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <label>ID Avance: </label>
        <input type="text" id="idAvance" style={{color:"blue"}}/>
        <div class="mb-3 col-lg-10 m-3">
          <label for="exampleFormControlInput1" class="form-label">
            Observación
          </label>
          <input
            type="text"
            class="form-control"
            id="idAvanceInput"
          />
        </div>


      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="button" data-bs-dismiss="modal" onClick={guardarObservacionAvance} class="btn btn-primary">Guardar</button>
      </div>
    </div>
  </div>
</div>
    {/* fin modal */}


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
                  <form
                    onSubmit={submitForm} 
                    onChange={updateFormData}
                    ref={form}
                    className="d-flex flex-wrap"
                  >
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
                      class="form-control editElement"
                      name="nombre"
                      defaultValue={queryData2.ProyectosPorId[0].nombre}
                      disabled
                    />
                  </div>
                  <div class="mb-3 col-lg-3 m-3">
                    <label for="exampleFormControlInput1" class="form-label">
                      Presupuesto
                    </label>
                    <input
                      type="text"
                      class="form-control editElement2"
                      name="presupuesto"
                      defaultValue={queryData2.ProyectosPorId[0].presupuesto}
                      disabled
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
                      defaultValue={queryData2.ProyectosPorId[0].estado}
                      disabled
                    />
                  </div>
                  
                  <div class="mb-3 col-lg-3 m-3">
                    <button type="button" id="BtnEditar" onClick={habilitarEdicionProyecto} class="btn btn-primary">Editar</button>
                    <button type="submit" id="btnGuardarProyecto" style={{display:'none'}} class="btn btn-warning">Guardar cambios</button>
                  </div>
                  </form>
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
                  <br/>
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
                  <br/>
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
                          ID AVANCE
                        </th>
                        {/* <th scope="col">TIPO</th> */}
                        <th scope="col" className="text-center">
                          DESCRIPCIÓN
                        </th>
                        <th scope="col" className="text-center">
                          OBSERVACIONES
                        </th>
                        <th scope="col" className="text-center">
                          OPCIONES
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
                              <td class="text-center">
                                <ul>
                                {
                                  u.observaciones.map((obs)=>{
                                    return (
                                     <li>{obs}</li> 
                                    )
                                  })
                                }
                                </ul>
                                </td>
                                <td class="d-flex justify-center">
                                {<button type="button" onClick={obtenerAvance} value={u._id} class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                  Adicionar
                                </button>}
                              </td>
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
