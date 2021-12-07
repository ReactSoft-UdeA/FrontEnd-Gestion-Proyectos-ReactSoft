import React from 'react'
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USUARIO } from 'graphql/usuarios/queries';
import Input from 'components/Input';
import ButtonLoading from 'components/ButtonLoading';

const EditarUsuario = () => {
    
    //captura los datos del id de la url
    const {_id} = useParams();
    const {data, error, loading} = useQuery(GET_USUARIO, {
        variables: {_id},
    });


    if (loading) return <h1 className="text-center display-1 h1"> Cargando!!</h1>

    
    console.log(data);
    return (
        <div className='flew flex-col w-full h-full items-center justify-center p-10'>
            <Link to='/usuarios'>
                <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
            </Link>
            <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Editar Usuario</h1>
            <form
                // onSubmit={submitForm}
                // onChange={updateFormData}
                // ref={form}
                className='flex flex-col items-center justify-center'
            >
                <Input
                    label='Nombre:'
                    type='text'
                    name='nombre'
                    defaultValue={data.Usuario.nombre}
                    required={true}
                />
                <Input
                    label='Apellido:'
                    type='text'
                    name='apellido'
                    defaultValue={data.Usuario.apellido}
                    required={true}
                />
                <Input
                    label='Correo:'
                    type='email'
                    name='correo'
                    defaultValue={data.Usuario.correo}
                    required={true}
                />
                <Input
                    label='Identificación:'
                    type='text'
                    name='identificacion'
                    defaultValue={data.Usuario.identificacion}
                    required={true}
                />
                {/* <DropDown
                    label='Estado de la persona:'
                    name='estado'
                    defaultValue={data.Usuario.estado}
                    required={true}
                    options={Enum_EstadoUsuario}
                /> */}
                {/* <span>Rol del usuario: {data.Usuario.rol}</span> */}
                <ButtonLoading
                    disabled={false}
                    loading={false}
                    text='Confirmar'
                />
        </form>
        </div>
    );
};

export default EditarUsuario;
