import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USUARIO } from 'graphql/usuarios/queries';
import Input from 'components/Input';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { EDITAR_USUARIO } from 'graphql/usuarios/mutations';
import { toast } from 'react-toastify';
import DropDown from 'components/Dropdown';
import { Enum_EstadoUsuario } from 'utils/enum';

const EditarUsuario = () => {

    //variables pque se envian para el cambio de datos
    const { form, formData, updateFormData } = useFormData(null);
    //captura los datos del id de la url
    const {_id} = useParams();
    const {data: queryData, error: queryError, loading: queryLoading} = useQuery(GET_USUARIO, {
        variables: {_id},
    });

    const [editarUsuario, { data: mutationData, loading: mutationLoading, error: mutationError }] = useMutation(EDITAR_USUARIO);

    
    //funcion para hacer submit al formulario y envio de datos
    const submitForm = (e) => {
        e.preventDefault();
        console.log('fd', formData);
        delete formData.rol;
        editarUsuario({
            variables: { _id, ...formData },
        });
    };

    useEffect(() => {
        if (mutationData) {
          toast.success('El Usuario se editó Exitosamente!!');
        }
      }, [mutationData]);

    useEffect(() => {
    if (mutationError) {
        toast.error('Error modificando el usuario');
    }

    if (queryError) {
        toast.error('Error consultando el usuario');
    }
    }, [queryError, mutationError]);
    
    console.log(queryData);
    if (queryLoading) return <h1 className="text-center display-1 h1"> Cargando!!</h1>

    return (
        <div className='flew flex-col w-full h-full items-center justify-center p-10'>
            {/* <Link to='/usuarios'>
                <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
            </Link> */}
            <button type="button" class="btn btn-outline-primary"><Link to='/usuarios' >Atras </Link></button>
            <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Editar Usuario</h1>
            <form
                onSubmit={submitForm}
                onChange={updateFormData}
                ref={form}
                className='flex flex-col items-center justify-center'
            >
                <span className = 'p-2 bg-light border'>Su Rol es: {queryData.Usuario.rol}</span>

                <Input
                    label='Nombre:'
                    type='text'
                    name='nombre'
                    defaultValue={queryData.Usuario.nombre}
                    required={true}
                />
                <Input
                    label='Apellido:'
                    type='text'
                    name='apellido'
                    defaultValue={queryData.Usuario.apellido}
                    required={true}
                />
                <Input
                    label='Correo:'
                    type='email'
                    name='correo'
                    defaultValue={queryData.Usuario.correo}
                    required={true}
                />
                <Input
                    label='Identificación:'
                    type='text'
                    name='identificacion'
                    defaultValue={queryData.Usuario.identificacion}
                    required={true}
                />
                <DropDown
                    label='Estado:'
                    name='estado'
                    defaultValue={queryData.Usuario.estado}
                    required={true}
                    options={Enum_EstadoUsuario}
                />
                <ButtonLoading
                    disabled={Object.keys(formData).length === 0}
                    loading={mutationLoading}
                    text='Confirmar Cambio'
                />
        </form>
        </div>
    );
};

export default EditarUsuario;
