import React, { useEffect } from 'react';
import Input from 'components/Input';
import ButtonLoading from 'components/ButtonLoading';
import { Link } from 'react-router-dom';
import useFormData from 'hooks/useFormData';
import { useMutation } from '@apollo/client';
import { LOGIN } from 'graphql/auth/mutation';
import { useAut } from 'context/autContext';
import { useNavigate } from 'react-router-dom';

const Login = () =>{
    const navigate = useNavigate();
    const {setToken} = useAut();
    const {form,formData,updateFormData} = useFormData();
    
    const [login, {data:dataMutation,loading:mutationLoading, error:mutationError}] =
    useMutation (LOGIN);

    const submitForm = (e)=>{
        e.preventDefault();

        login({
            variables: formData, 
        });
    };
    useEffect(() => {
        console.log('data mutation', dataMutation);
        if (dataMutation) {
          if (dataMutation.login.token) {
            setToken(dataMutation.login.token);
            navigate('/');
          }
        }
      }, [dataMutation, setToken, navigate]);

    return (
        <div className='flex flex-col items-center justify-center w-full h-full p-10'>
            <h1 className='text-xl font-bold text-gray-900'>Iniciar sesión</h1>
            <form className='flex flex-col' onSubmit={submitForm} onChange={updateFormData} ref={form}>              
                <Input name='correo' type='email' label='Correo:'  required= {true} />
                <Input name='clave' type='password' label='Contraseña:' required= {true} />
                <ButtonLoading
                disabled={Object.keys(formData).length === 0}
                loading = {mutationLoading}
                text = 'Iniciar sesión'
                />
            </form>
                <span>¿No tienes una cuenta?</span>
                <Link to= '/auth/register'>
                    <span className='text-blue-700'>Regístrate</span>
                </Link>
        </div>
    );
};

export default Login