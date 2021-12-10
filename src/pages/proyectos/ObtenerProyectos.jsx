import React, {useEffect} from 'react'
import { useQuery } from '@apollo/client'
import { GET_PROYECTOS_LIDER } from 'graphql/proyectos/queries'
import { toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';

const ObtenerProyectos = () => {
    const {_id} = useParams();
    const {data, error, loading} = useQuery(GET_PROYECTOS_LIDER, {
        variables: { id: { _id }},
    });
       
    useEffect(() => {
        console.log('data servidor ', data)
    }, [data]);

    // sacar error de validacion de proyecto
    useEffect(() => {
        if (error) {
            toast.error('Error en la consulta de Proyectos');
        }
    }, [error]);

    if (loading) return <h1 className="text-center display-1 h1"> Cargando!!</h1>

    return (
        <div>
            <h1 class="text-center display-1 h1 pt-10">Proyectos</h1>
            <div class="container pt-10">
            <table class="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">ID PROYECTO</th>
                    <th scope="col">NOMBRE PROYECTO</th>
                    <th scope="col">PRESUPUESTO</th>
                    <th scope="col">INICIO</th>
                    <th scope="col">FIN</th>
                    <th scope="col">FASE</th>
                    <th scope="col">ESTADO</th>
                    <th scope="col">OPCIONES</th>
                    </tr>
                </thead>
                <tbody>

                {data &&
                data.ProyectosPorLider.map((u) => {
        
                    return (
                        <tr key={u._id}>
                            {/* <th scope="row" className="text-center">{u._id.slice(20)}</th> */}
                                <td class="text-center">{u._id.slice(20)}</td>
                                <td class="text-center">{u.nombre}</td>
                                <td class="text-center">{u.presupuesto}</td>
                                <td class="text-center">{u.fechaInicio}</td>
                                <td class="text-center">{u.fechaFin}</td>
                                <td class="text-center">{u.fase}</td>
                                <td class="text-center">{u.estado}</td>
                                <td class="d-flex justify-content-around align-items-center" style={{color:"red",height:"75px"}}>
                                    <Link to ={`/proyecto/detalle/${u._id}`} >
                                        <i class='fas fa-eye input-group justify-content-around '></i>
                                    </Link>
                                    <Link to ={`/proyecto/mostrar/${u._id}`} >
                                        <i class='fas fa-pen input-group justify-content-around '></i>
                                    </Link>
                                    
                                </td>
                        </tr>
                    );           
                   
                    })}
                </tbody>
                </table>
            </div>
        </div>
    )
}

export default ObtenerProyectos
