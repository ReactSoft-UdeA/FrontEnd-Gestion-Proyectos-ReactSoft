import React, { useEffect } from "react";
import PrivateRoute from "components/PrivateRoute";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_AVANCE } from "graphql/proyectosEstudiante/queries";
import Input from "components/Input";
import ButtonLoading from "components/ButtonLoading";
import useFormData from "hooks/useFormData";
import { toast } from "react-toastify";
import { EDITAR_AVANCE } from "graphql/proyectosEstudiante/mutations";

const EditarAvance = () => {
  const { form, formData, updateFormData } = useFormData(null);
  const { _id } = useParams();

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
    refetch,
  } = useQuery(GET_AVANCE, {
    variables: { _id },
  });

  const [
    editarUsuario,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(EDITAR_AVANCE);

  const submitForm = (e) => {
    e.preventDefault();
    delete formData.rol;
    editarUsuario({
      variables: { _id, ...formData },
    });
  };

  useEffect(() => {
    if (mutationData) {
      toast.success("Usuario modificado correctamente");
      refetch();
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error("Error modificando el usuario");
    }

    if (queryError) {
      toast.error("Error consultando el usuario");
    }
  }, [queryError, mutationError]);

  if (queryLoading) return <div>Cargando....</div>;

  return (
    <div>
      <PrivateRoute roleList={["ESTUDIANTE"]}>
        <div className="flew flex-col w-full h-full items-center justify-center p-10">
          <button type="button" class="btn btn-outline-primary">
            <Link to="/proyectosEstudiante/index">Atras </Link>
          </button>
          <br />
          <br />
          <br />
          <div className=" bg-gray-100 text-center display-5">
            <h5>Editar Avance </h5>
          </div>

          <br />
          <form
            onSubmit={submitForm}
            onChange={updateFormData}
            ref={form}
            className="flex flex-col items-center justify-center"
          >
            <Input
              label="Id del Avance"
              type="text"
              name="_id"
              defaultValue={queryData.Avance._id}
              required={false}
            />
            <Input
              label="Fecha"
              type="text"
              name="fecha"
              defaultValue={queryData.Avance.fecha.slice(0, 10)}
              required={true}
            />
            <Input
              label="Descripción"
              type="text"
              name="descripcion"
              defaultValue={queryData.Avance.descripcion}
              required={true}
            />
            <Input
              label="Observaciones del Tutor"
              type="text"
              name="observaciones"
              defaultValue={queryData.Avance.observaciones}
              disabled
              required={false}
            />
            <ButtonLoading
              disabled={Object.keys(formData).length === 0}
              loading={mutationLoading}
              text="Guardar Cambios"
            />
          </form>
        </div>
      </PrivateRoute>
    </div>
  );
};

export default EditarAvance;
