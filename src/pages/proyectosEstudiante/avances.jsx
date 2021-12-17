import React, { useEffect } from "react";
import PrivateRoute from "components/PrivateRoute";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_AVANCES } from "graphql/proyectosEstudiante/queries";
import { GET_USUARIOS } from "graphql/usuarios/queries";
import { CREAR_INSCRIPCION } from "graphql/inscripciones/mutaciones";
import useFormData from "hooks/useFormData";
import ButtonLoading from "components/ButtonLoading";
import Input from "components/Input";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useUser } from "context/userContext";

const AvancesEstudiante = () => {
  const navigate = useNavigate();
  const { form, formData, updateFormData } = useFormData(null);

  const { _id } = useParams();
  const { userData } = useUser();
  console.log("id", _id);
  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_AVANCES, {
    variables: { _id },
    // variables: { _id, ...formData },
  });

  //MUTACION PARA ENVIAR DATOS
  // const [
  //   crearInscripcion,
  //   { data: mutationData, loading: mutationLoading, error: mutationError },
  // ] = useMutation(CREAR_INSCRIPCION);

  const submitForm = (e) => {
    e.preventDefault();
    console.log("enviar datos al backend", formData);
  };
  // crearInscripcion({ variables: formData });
  //   crearInscripcion({ variables: { _id, ...formData } });
  // };

  // useEffect(() => {
  //   if (mutationData) {
  //     toast.success("La inscripción fue exitosa!!");
  //     navigate("/proyectosUsuarios/index");
  //   }
  // }, [mutationData]);

  // useEffect(() => {
  //   if (mutationError) {
  //     toast.error("Error realizando la inscripción");
  //   }
  // <h1>Error Consultando avances</h1>;
  //   if (queryError) {
  //     toast.error("Error consultando el proyecto");
  //   }
  // }, [queryError]);

  //TRAER DATOS DE USUARIO
  // const {
  //   data: query2Data,
  //   error: query2Error,
  //   loading: query2Loading,
  // } = useQuery(GET_USUARIOS);

  // useEffect(() => {
  //   console.log("data servidor ", query2Data);
  // }, [query2Data]);

  useEffect(() => {
    if (queryError)
      return (
        <div>
          <h1 className="text-center display-1 h1"> Oops! </h1>
          <h3 className="text-center display-5 ">
            {" "}
            ¡Parece que aún no se han creado avances en este proyecto!{" "}
          </h3>
        </div>
      );
  }, [queryError]);

  if (queryLoading)
    return <h1 className="text-center display-1 h1"> Cargando!!</h1>;

  return (
    <div>
      <PrivateRoute roleList={["ESTUDIANTE"]}>
        <div className="flew flex-col w-full h-full items-center justify-center p-10">
          {/* boton atras */}
          <button type="button" class="btn btn-outline-primary">
            <Link to="/proyectosEstudiante/index">Atras </Link>
          </button>
          <br />
          <br />
          {/* <div class="col-lg-11 m-10 d-flex flex-wrap align-items-start"> */}

          {/* formulario */}
          <div className=" bg-gray-100 text-center display-5">
            <h5>Proyecto:</h5>
            {/* <h5>{queryData.filtrarAvance[0].proyecto.nombre}</h5> */}
          </div>

          <br />
          <br />
          <h2 class="col-lg-12 mb-3 bg-info p-1">
            <strong>AVANCES</strong>
          </h2>

          {/* ************************************** */}

          {/* <table class="table table-hover"> */}
          <table class="table table-striped table-hover align-middle table-bordered">
            <thead className="tabla">
              <tr>
                <th scope="col" className="text-center">
                  ID Avance
                </th>
                <th scope="col" className="text-center">
                  Fecha
                </th>
                <th scope="col" className="text-center">
                  Descripción
                </th>
                <th scope="col" className="text-center">
                  Observaciones
                </th>
                <th scope="col" className="text-center">
                  nombre
                </th>
                <th scope="col" className="text-center">
                  Apellido
                </th>
                <th scope="col" className="text-center">
                  Estado
                </th>
                <th scope="col" className="text-center">
                  Opciones
                </th>
              </tr>
            </thead>
            <tbody>
              {queryData &&
                queryData.filtrarAvance.map((u) => {
                  return (
                    <tr key={u._id}>
                      <th scope="row" className="text-center">
                        {u._id.slice(20)}
                      </th>
                      <td class="text-center">{u.fecha.slice(0, 10)}</td>
                      <td class="text-center">{u.descripcion}</td>
                      {/* <td class="text-center">{u.proyecto.nombre}</td> */}
                      <td class="text-center">{u.observaciones}</td>
                      <td class="text-center">{u.creadoPor.nombre}</td>
                      <td class="text-center">{u.creadoPor.apellido}</td>
                      <td class="text-center">{u.creadoPor.estado}</td>
                      <td
                        class="d-flex justify-content-around align-items-center"
                        style={{ color: "#1588B4", height: "65px" }}
                      >
                        <Link to={`/proyectosEstudiante/editarAvance/${u._id}`}>
                          <button> Editar Avance </button>
                          <i className="fas fa-pencil-alt input-group justify-content-around "></i>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {/* ************************************** */}
        </div>
      </PrivateRoute>
    </div>
  );
};

export default AvancesEstudiante;
