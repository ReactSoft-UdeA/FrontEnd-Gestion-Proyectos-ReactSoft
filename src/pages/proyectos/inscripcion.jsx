import React, { useEffect } from "react";
import Input from "components/Input";
import DropDown from "components/Dropdown";
import ButtonLoading from "components/ButtonLoading";
import { Enum_Rol } from "utils/enums";
import useFormData from "hooks/useFormData";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { POST_INSCRIPCION } from "graphql/inscripciones/mutation";
import { useNavigate } from "react-router";

const InscripcionProyecto = () => {
  const navigate = useNavigate();

  const { form, formData, updateFormData } = useFormData();

  const [
    InscripcionProyecto,
    { data: dataMutation, loading: loadingMutation, error: errorMutation },
  ] = useMutation(POST_INSCRIPCION);

  const submitForm = (e) => {
    e.preventDefault();
    console.log("enviar datos al backend", formData);
    InscripcionProyecto({ variables: formData });
  };

  //   useEffect(() => {
  //     console.log("data mutation", dataMutation);
  //     if (dataMutation) {
  //       if (dataMutation.registro.token) {
  //         localStorage.setItem("token", dataMutation.registro.token);
  //         navigate("/");
  //       }
  //     }
  //   }, [dataMutation]);

  return (
    <div className="flex flex-col h-full w-full items-center justify-center">
      <h1 className="text-3xl font-bold my-4">Inscripcion a Proyecto</h1>
      <form
        className="flex flex-col"
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
      >
        <div className="grid grid-cols-2 gap-5">
          <Input label="Nombre:" name="nombre" type="text" required />
          <Input label="Apellido:" name="apellido" type="text" required />
          <Input
            label="Documento:"
            name="identificacion"
            type="text"
            required
          />
          <DropDown
            label="Rol deseado:"
            name="rol"
            required={true}
            options={Enum_Rol}
          />
          <Input label="Correo:" name="correo" type="email" required />
          <Input label="Contraseña:" name="clave" type="password" required />
        </div>
        <ButtonLoading
          disabled={Object.keys(formData).length === 0}
          loading={false}
          text="Registrarme"
        />
      </form>
      <span>¿Ya tienes una cuenta?</span>
      <Link to="/auth/login">
        <span className="text-blue-700">Inicia sesión</span>
      </Link>
    </div>
  );
};

export default InscripcionProyecto;
