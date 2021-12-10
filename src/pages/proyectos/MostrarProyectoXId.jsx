import React,{useEffect} from 'react'
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PROYECTOXID } from 'graphql/proyectos/queries'
import { toast } from 'react-toastify';


const MostrarProyectoXId = () => {

    const {_id} = useParams();
    /* const {data: queryData, error: queryError, loading: queryLoading} = useQuery(GET_USUARIO, {
        variables: {_id},
    }); */

    const {data: queryData, error: queryError, loading: queryLoading} = useQuery(GET_PROYECTOXID, {
        variables: {_id},
    });

    /* useEffect(() => {
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
  */   
    
    if (queryLoading) return <h1 className="text-center display-1 h1"> Cargando!!</h1>

    return (
        <div>
            <div class="col-lg-11 m-10 d-flex flex-wrap align-items-start">
                <h1 class="col-lg-12"><strong>PROYECTO</strong></h1>
                <br/>
            <div class="mb-3 col-lg-3 m-3">
                <label for="exampleFormControlInput1" class="form-label">Id Proyecto</label>
                <input type="text" class="form-control" value={_id} disabled/>
            </div>
            <div class="mb-3 col-lg-3 m-3">
                <label for="exampleFormControlInput1" class="form-label">Nombre proyecto</label>
                <input type="text" class="form-control" value={ queryData.ProyectosPorId[0].nombre } disabled/>
            </div>
            <div class="mb-3 col-lg-3 m-3">
                <label for="exampleFormControlInput1" class="form-label">Presupuesto</label>
                <input type="text" class="form-control" value={ queryData.ProyectosPorId[0].presupuesto } disabled/>
            </div>
            <div class="mb-3 col-lg-3 m-3">
                <label for="exampleFormControlInput1" class="form-label">Fecha inicio</label>
                <input type="text" class="form-control" value={ queryData.ProyectosPorId[0].fechaInicio } disabled/>
            </div>
            <div class="mb-3 col-lg-3 m-3">
                <label for="exampleFormControlInput1" class="form-label">Fecha fin</label>
                <input type="text" class="form-control" value={ queryData.ProyectosPorId[0].fechaFin } disabled/>
            </div>
            <div class="mb-3 col-lg-3 m-3">
                <label for="exampleFormControlInput1" class="form-label">Estado</label>
                <input type="text" class="form-control" value={ queryData.ProyectosPorId[0].estado } disabled/>
            </div>
                <b/>
                <h2 class="col-lg-12 mb-3"><strong>OBJETIVOS</strong></h2>

            
            <table class="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">ID OBJETIVO</th>
                    <th scope="col">TIPO</th>
                    <th scope="col">DESCRIPCIÓN</th>
                    <th scope="col">EDITAR</th>
                    </tr>
                </thead>
                <tbody>

                {queryData &&
                queryData.ProyectosPorId[0].objetivos.map((u) => {
        
                    return (
                        <tr key={u._id}>
                            {/* <th scope="row" className="text-center">{u._id.slice(20)}</th> */}
                                <td class="text-center">{u._id.slice(20)}</td>
                                <td class="text-center">{u.tipo}</td>
                                <td class="text-center">{u.descripcion}</td>
                                <td >
                                    <Link to ={`/proyecto/mostrar/${u._id}`} >
                                        <i class='fas fa-pen input-group justify-content-around '></i>
                                    </Link>
                                </td>
                        </tr>
                    );           
                   
                    })}
                </tbody>
                </table>

                <button type="button" class="btn btn-primary">Editar</button>    
            
            </div>
                
        </div>
    )
}

export default MostrarProyectoXId

