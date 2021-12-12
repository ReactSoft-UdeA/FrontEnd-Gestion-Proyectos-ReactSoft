// import React from "react";

// const InscripcionProyectos = () => {
//   return (
//     <div>
//       <h1 className="text-center display-1 h1 pt-10">
//         Inscripcion a Proyectos
//       </h1>
//     </div>
//   );
// };

// export default InscripcionProyectos;

// **********************************************************

import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PROYECTO_INSCRIPCION } from "graphql/inscripciones/queries";
import { GET_USUARIOS } from "graphql/usuarios/queries";
import { CREAR_INSCRIPCION } from "graphql/inscripciones/mutaciones";
import useFormData from "hooks/useFormData";
import ButtonLoading from "components/ButtonLoading";
import Input from "components/Input";
import DropDown from "components/Dropdown";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useUser } from "context/userContext";

//TRAER DATOS A LAS CASILLAS
// const MostrarProyectoXIdCer = () => {
const CrearInscripcion = () => {
  const navigate = useNavigate();
  const { form, formData, updateFormData } = useFormData(null);

  const { _id } = useParams();
  const { userData } = useUser();
  console.log("id", _id);
  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_PROYECTO_INSCRIPCION, {
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

  //   if (queryError) {
  //     toast.error("Error consultando el proyecto");
  //   }
  // }, [queryError, mutationError]);

  //TRAER DATOS DE USUARIO
  const {
    data: query2Data,
    error: query2Error,
    loading: query2Loading,
  } = useQuery(GET_USUARIOS);

  useEffect(() => {
    console.log("data servidor ", query2Data);
  }, [query2Data]);

  if (queryLoading)
    return <h1 className="text-center display-1 h1"> Cargando!!</h1>;

  return (
    <div className="flew flex-col w-full h-full items-center justify-center p-10">
      {/* boton atras */}
      <button type="button" class="btn btn-outline-primary">
        <Link to="/proyectosUsuarios/index">Atras </Link>
      </button>
      <br />
      <br />
      {/* <div class="col-lg-11 m-10 d-flex flex-wrap align-items-start"> */}
      <h2 class="col-lg-12 mb-3 bg-info p-1">
        <strong>DATOS DE LA INSCRIPCION</strong>
      </h2>
      {/* formulario */}
      <div className=" bg-gray-100 text-center display-5">
        <h5>Proyecto:</h5>
        <h5>{queryData.ProyectosPorId[0].nombre}</h5>
      </div>
      <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        className="flex flex-col items-center justify-center"
      >
        {/* Hacer query para id de usuario */}

        <Input
          label="Id_Proyecto a Inscribir:"
          type="text"
          name="_id"
          defaultValue={queryData.ProyectosPorId[0]._id}
          required={true}
        />
        <Input
          label="Estado de Proyecto a Inscribir:"
          type="text"
          name="estado"
          defaultValue={queryData.ProyectosPorId[0].estado}
          disabled
          required={true}
        />
        {/* <Input
          label="Correo:"
          type="email"
          name="correo"
          // defaultValue={query2Data.Usuarios[0].correo}
          defaultValue={query2Data.Usuario[0].correo}
          required={true}
        /> */}
        {/* <DropDown
          label="Estado:"
          name="estado"
          defaultValue={query2Data[0].map()}
          required={true}
        /> */}
        {/* <DropDown
          label="Estado:"
          name="estado"
          defaultValue={queryData.Usuario.estado}
          required={true}
          options={Enum_EstadoUsuario}
        /> */}
        {/* <ButtonLoading
          disabled={Object.keys(formData).length === 0}
          loading={mutationLoading}
          text="Confirmar Cambio"
        /> */}
        <ButtonLoading
          disabled={Object.keys(formData).length === 0}
          loading={false}
          text="Registrarme"
        />
      </form>

      {/* ************************************** */}
      <b />
      <h2 class="col-lg-12 mb-3 bg-info p-1">
        <strong>OBJETIVOS DEL PROYECTO A INSCRIBIR</strong>
      </h2>

      {/* <table class="table table-hover"> */}
      <table class="table table-striped table-hover align-middle table-bordered">
        <thead>
          <tr>
            <th scope="col" className="text-center">
              ID OBJETIVO
            </th>
            <th scope="col" className="text-center">
              TIPO
            </th>
            <th scope="col" className="text-center">
              DESCRIPCIÓN
            </th>
          </tr>
        </thead>
        <tbody>
          {queryData &&
            queryData.ProyectosPorId[0].objetivos.map((u) => {
              return (
                <tr key={u._id}>
                  <th scope="row" className="text-center">
                    {u._id.slice(20)}
                  </th>
                  {/* <td class="text-center">{u._id.slice(20)}</td> */}
                  <td class="text-center">{u.tipo}</td>
                  <td class="text-center">{u.descripcion}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <br />
    </div>

    // </div>
  );
};

export default CrearInscripcion;
