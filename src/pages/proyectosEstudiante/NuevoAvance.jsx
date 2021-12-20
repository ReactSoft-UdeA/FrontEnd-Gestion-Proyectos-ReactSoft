import React, { useEffect, useState } from "react";
import PrivateRoute from "components/PrivateRoute";
import { useMutation } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import { useUser } from "context/userContext";
import Input from "components/Input";
import { toast } from "react-toastify";
import ButtonLoading from "components/ButtonLoading";
import useFormData from "hooks/useFormData";
import { CREAR_AVANCE } from "graphql/proyectosEstudiante/mutations";
import { useNavigate } from 'react-router';

const NuevoAvance = () => {
  
  const navigate = useNavigate();

  const { form, formData, updateFormData } = useFormData();
  const { userData } = useUser();
  const [IdEstudiante, setIdEstudiante] = useState("");
  const { _id } = useParams();

  const [
    crearAvance,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(CREAR_AVANCE);

  useEffect(() => {
    console.log("data mutation", mutationData);
  });

  useEffect(() => {
    setIdEstudiante(userData._id);
  }, [userData]);

  const submitForm = (e) => {
    e.preventDefault();
    crearAvance({
      variables: formData,
    });
  };

  useEffect(() => {
    if (mutationData) {
      toast.success("Avance Creado Correctamente");
      navigate("/proyectosEstudiante/index");
    }
  }, [mutationData]);

  return (
    <div class="bg-gradient-to-r from-blue-500 to-green-500 rounded-lg px-6 py-8 ring-1 ring-gray-900/5 shadow-xl">
    <div>
      <PrivateRoute roleList={["ESTUDIANTE"]}>
        <div className="flew flex-col w-full h-full items-center justify-center p-10">
          <button type="button" class="btn btn-outline-primary bg-gradient-r green-100 text-white text-bold">
            <Link to="/proyectosEstudiante/index">Atras </Link>
          </button>
          <br />
          <br />
          <br />
          <div className=" bg-gray-100 text-center display-5">
            <h5>Crear Avance </h5>
          </div>

          <br />
          <form
            onSubmit={submitForm}
            onChange={updateFormData}
            ref={form}
            className="flex flex-col items-center justify-center"
          >
            <Input
              label="Fecha de Creación"
              type="date"
              name="fecha"
              required={true}
            />
            <Input
              label="Descripción"
              type="text"
              name="descripcion"
              required={true}
            />
            <Input
              label="ID de Proyecto"
              type="text"
              name="proyecto"
              defaultValue={_id}
              required={true}
            />
            <Input
              label="ID de Estudiante"
              type="text"
              name="creadoPor"
              defaultValue={IdEstudiante}
              disabled
              required={true}
            />
            <ButtonLoading
              disabled={Object.keys(formData).length === 0}
              loading={false}
              text="Crear Avance"
            />
          </form>
        </div>
      </PrivateRoute>
    </div>
    </div>
  );
};

export default NuevoAvance;
