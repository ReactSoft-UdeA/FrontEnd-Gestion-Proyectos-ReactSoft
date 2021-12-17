import React, { useEffect, useState } from "react";
import PrivateRoute from "components/PrivateRoute";
import { useMutation } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import { useUser } from "context/userContext";
import Input from "components/Input";
import { toast } from "react-toastify";
import ButtonLoading from "components/ButtonLoading";
import useFormData from "hooks/useFormData";
import { useNavigate } from "react-router";
import { CREAR_AVANCE } from "graphql/proyectosEstudiante/mutations";

const NuevoAvance = () => {
  const { form, formData, updateFormData } = useFormData();
  const { userData } = useUser();
  const [IdEstudiante, setIdEstudiante] = useState("");
  const { _id } = useParams();
  const navigate = useNavigate();

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
    // navigate("/proyectosEstudiante/index");
  };

  useEffect(() => {
    if (mutationData) {
      toast.success("Avance Creado Correctamente");
    }
  }, [mutationData]);
  // if (loading) return <div>...Loading</div>;

  return (
    <div>
      <PrivateRoute roleList={["ESTUDIANTE"]}>
        <div className="flew flex-col w-full h-full items-center justify-center p-10">
          {/* boton atras */}
          <button type="button" class="btn btn-outline-primary">
            <Link to="/proyectosEstudiante/index">Atras </Link>
          </button>
          <br />
          {/* <div class="col-lg-11 m-10 d-flex flex-wrap align-items-start"> */}

          {/* formulario */}

          {/* ************************************** */}
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
              // defaultValue={queryData.Avance._id}
              required={true}
            />
            <Input
              label="Descripción"
              type="text"
              name="descripcion"
              // defaultValue={queryData.Avance.fecha.slice(0, 10)}
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
  );
};

export default NuevoAvance;
