import React, { useEffect, useState } from "react";
import PrivateRoute from "components/PrivateRoute";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PROYECTO_INSCRIPCION } from "graphql/proyectosEstudiante/queries";
import { CREAR_INSCRIPCION } from "graphql/proyectosEstudiante/mutations";
import useFormData from "hooks/useFormData";
import ButtonLoading from "components/ButtonLoading";
import Input from "components/Input";
import DropDown from "components/Dropdown";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useUser } from "context/userContext";

const CrearInscripcion = () => {
  const navigate = useNavigate();
  const { form, formData, updateFormData } = useFormData(null);
  const { userData } = useUser();
  const [IdEstudiante, setIdEstudiante] = useState("");
  const { _id } = useParams();
  // const navigate = useNavigate();

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_PROYECTO_INSCRIPCION, {
    variables: { _id },
  });

  const [
    crearInscripcion,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(CREAR_INSCRIPCION);

  useEffect(() => {
    console.log("data mutation", mutationData);
  });

  useEffect(() => {
    setIdEstudiante(userData._id);
  }, [userData]);

  const submitForm = (e) => {
    e.preventDefault();
    crearInscripcion({
      variables: formData,
    });
    // navigate("/proyectosEstudiante/index");
  };

  useEffect(() => {
    if (mutationData) {
      toast.success("Inscripcion Creada Correctamente");
    }
  }, [mutationData]);

  if (queryLoading)
    return <h1 className="text-center display-1 h1"> Cargando!!</h1>;
  return (
    <div>
      <PrivateRoute roleList={["ESTUDIANTE"]}>
        <div class="bg-gradient-to-r from-blue-500 to-green-500 rounded-lg px-6 py-8 ring-1 ring-gray-900/5 shadow-xl">
          <div className="flew flex-col w-full h-full items-center justify-center p-10">
            {/* boton atras */}
            <button type="button" class="btn btn-outline-primary">
              <Link to="/proyectosEstudiante/proyectosDisponibles">Atras </Link>
            </button>
            <br />
            <br />
            {/* <div class="col-lg-11 m-10 d-flex flex-wrap align-items-start"> */}
            <h2 class="col-lg-12 mb-3 bg-info p-1">
              <strong>DATOS DE LA INSCRIPCION</strong>
            </h2>
            {/* formulario */}
            <div className=" bg-gray-100 bg-transparent text-center text-opacity-90 display-5">
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
                name="proyecto"
                defaultValue={_id}
                required={true}
              />
              <Input
                label="Id_Estudiante:"
                type="text"
                name="estudiante"
                defaultValue={IdEstudiante}
                disabled
                required={true}
              />
              <ButtonLoading
                disabled={Object.keys(formData).length > 0}
                // loading={false}
                text="Registrarme"
              />
            </form>

            {/* ************************************** */}
            <b />
            <h2 class="col-lg-12 mb-3 bg-info p-1">
              <strong>OBJETIVOS DEL PROYECTO A INSCRIBIR</strong>
            </h2>

            {/* <table class="table table-hover"> */}
            <table class="table table-striped table-hover align-middle table-bordered bg-gray-200">
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
        </div>
        {/* </div> */}
      </PrivateRoute>
    </div>
  );
};

export default CrearInscripcion;
