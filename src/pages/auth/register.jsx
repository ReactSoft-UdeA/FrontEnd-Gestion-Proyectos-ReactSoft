import React, { useEffect } from "react";
import Input from "components/Input";
import { Enum_Rol } from "utils/enums";
import DropDown from "components/Dropdown";
import ButtonLoading from "components/ButtonLoading";
import useFormData from "hooks/useFormData";
import { Link } from "react-router-dom";
import { REGISTRO } from "graphql/auth/mutation";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router";
import { useAuth } from "context/authContext";

const Register = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const { form, formData, updateFormData } = useFormData();

  const [registro, { data: dataMutation }] = useMutation(REGISTRO);

  const submitForm = (e) => {
    e.preventDefault();
    registro({ variables: formData });
  };

  useEffect(() => {
    if (dataMutation) {
      if (dataMutation.registro.token) {
        setToken(dataMutation.registro.token);
        navigate("/");
      }
    }
  }, [dataMutation, setToken, navigate]);

  return (
    <div class="bg-gradient-to-r from-blue-500 to-green-500 rounded-lg px-6 py-8 ring-1 ring-gray-900/5 shadow-xl">
      <div className="flex flex-col h-full w-full items-center justify-center">
        <h1 className="text-8xl text-bold text-white">Regístrate</h1>
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
            <Input
              label="Contraseña:"
              name="password"
              type="password"
              required
            />
          </div>
          <ButtonLoading
            disabled={Object.keys(formData).length === 0}
            loading={false}
            text="Registrarme"
          />
        </form>
        <span>¿Ya tienes una cuenta?</span>
        <Link to="/auth/login">
          <span className="text-2xl text-bold text-white">Inicia sesión</span>
        </Link>
      </div>
    </div>
  );
};

export default Register;
