import React, { useEffect } from "react";
import Input from "components/Input";
import ButtonLoading from "components/ButtonLoading";
import { Link } from "react-router-dom";
import useFormData from "hooks/useFormData";
import { useMutation } from "@apollo/client";
import { LOGIN } from "graphql/auth/mutation";
import { useAuth } from "context/authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const { form, formData, updateFormData } = useFormData();

  const [
    login,
    { data: dataMutation, loading: mutationLoading, error: mutationError },
  ] = useMutation(LOGIN);

  const submitForm = (e) => {
    e.preventDefault();

    login({
      variables: formData,
    });
  };

  useEffect(() => {
    if (dataMutation) {
      if (dataMutation.login.token) {
        setToken(dataMutation.login.token);
        navigate("/");
      }
    }
  }, [dataMutation, setToken, navigate]);

  return (
    <div class="bg-gradient-to-r from-blue-500 to-green-500 rounded-lg px-6 py-8 ring-1 ring-gray-900/5 shadow-xl">
    <div className='p-10 flex flex-col'>
    <div className='flex w-full items-center justify-center'>
      <h1 className='text-9xl text-white text-white font-medium tracking-tight'>Iniciar Sesión</h1>
    </div>
      <span className="text 3xl text-bold text-white text-center">!Bienvenido/a!</span>
      <form
        className="flex flex-col"
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
      >
        <Input name="correo" type="email" label="Correo" required={true} />
        <Input
          name="password"
          type="password"
          label="Contraseña"
          required={true}
        />
        <ButtonLoading
          disabled={Object.keys(formData).length === 0}
          loading={mutationLoading}
          text="Iniciar Sesión"
        />
      </form>
      <span className="text-1xl text-bold text-white-300">¿No tienes una cuenta?</span>
      <Link to="/auth/register">
        <span className="text-2xl text-bold text-white">Regístrate</span>
      </Link>
      {/* <img src="./public/log-rsoft.png" alt="Logo" className="h-5" /> */}
    </div>
    </div>
  );
};

export default Login;
