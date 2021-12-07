import React, {useEffect} from 'react'
import { useQuery } from '@apollo/client'
import { GET_USUARIOS } from 'graphql/usuarios/queries'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Enum_Rol } from 'utils/enums';
import { Enum_EstadoUsuario } from 'utils/enums';

const IndexUsuarios = () => {
    const {data, error, loading} = useQuery(GET_USUARIOS);

    useEffect(() => {
        console.log('data servidor ', data)
    }, [data]);


    // sacar error de validacion de ususarios
    useEffect(() => {
        if (error) {
            toast.error('Error en la consulta de Usuarios');
        }
    }, [error]);

    if (loading) return <h1 className="text-center display-1 h1"> Cargando!!</h1>

    return (
        <div>
            <h1 className="text-center display-1 h1 pt-10">Usuarios</h1>
            <div className= 'container pt-10'>
                <table className="table table-striped table-hover align-middle table-bordered ">
                    <thead className="table-primary">
                        <tr className="">
                        <th scope="col" className="text-center">ID</th>
                        <th scope="col" className="text-center">Identificacion</th>
                        <th scope="col" className="text-center">Nombres</th>
                        <th scope="col" className="text-center">Apellidos</th>
                        <th scope="col" className="text-center">Correo</th>
                        <th scope="col" className="text-center">Rol</th>
                        <th scope="col" className="text-center">Estado</th>
                        <th scope="col" className="text-center">Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data &&
                            data.Usuarios.map((u) => {
                                return (
                                    <tr key={u._id}>
                                        {/* <th scope="row" className="text-center">{u._id.slice(20)}</th> */}
                                            <td className="text-center">{u._id.slice(20)}</td>
                                            <td className="text-center">{u.identificacion}</td>
                                            <td className="text-center">{u.nombre}</td>
                                            <td className="text-center">{u.apellido}</td>
                                            <td className="text-center">{u.correo}</td>
                                            <td className="text-center">{Enum_Rol[u.rol]}</td>
                                            <td className="text-center">{Enum_EstadoUsuario[u.estado]}</td>
                                            <td ><Link to ={`/usuarios/editar/${u._id}`} ><i className='fas fa-pen input-group justify-content-around '></i></Link></td>
                                    </tr>
                                );

                            })}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default IndexUsuarios
