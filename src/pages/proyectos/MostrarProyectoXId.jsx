import React,{useEffect} from 'react'
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PROYECTOXID } from 'graphql/proyectos/queries'
import { toast } from 'react-toastify';
import useFormData from "hooks/useFormData";
import {EDITAR_PROYECTO} from 'graphql/proyectos/mutations';
import { useNavigate } from "react-router";

const MostrarProyectoXId = () => {
    const navigate = useNavigate();

    const { form, formData, updateFormData } = useFormData(null);
    const {_id} = useParams();
    
    const {
        data: queryData,
        error: queryError,
        loading: queryLoading,
      } = useQuery(GET_PROYECTOXID, {
        variables: { _id },
      });

  const [
    editarProyecto,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(EDITAR_PROYECTO);

  const submitForm = (e)=>{
    e.preventDefault();
    formData.presupuesto = parseFloat(formData.presupuesto);
    editarProyecto({
        variables: { _id, ...formData },
      });
  }


     useEffect(() => {
        if (mutationData) {
          toast.success('El proyecto se editó Exitosamente!!');
        }
      }, [mutationData]);

      /*
    useEffect(() => {
    if (mutationError) {
        toast.error('Error modificando el usuario');
    }

    if (queryError) {
        toast.error('Error consultando el usuario');
    }
    }, [queryError, mutationError]);
  */   

    
    
    const habilitarEdicionProyecto = ()=>{
        document.querySelector(".allowEdit").disabled=false;    
        document.querySelector("#nombreProyectoEditable").disabled=false;    
        document.querySelector("#presupuestoId").disabled=false;    
        document.querySelector("#estadoId").disabled=false;    
        document.querySelector("#btnEditarProyecto").style.display="none";    
        document.querySelector("#btnGuardarCambiosProyecto").style.display="block";    
    }

    if (queryLoading) return <h1 className="text-center display-1 h1"> Cargando!!</h1>

    return (
        <div>
            <form 
                onSubmit={submitForm} 
                onChange={updateFormData}
                ref={form}
                >

            <div class="col-lg-11 m-10 d-flex flex-wrap align-items-start">
                <h1 class="col-lg-12"><strong>PROYECTO {_id}</strong></h1>
                <br/>
                
            <div class="mb-3 col-lg-3 m-3">
                <label for="exampleFormControlInput1" class="form-label">Id Proyecto</label>
                <input type="text" name="_id" class="form-control" defaultValue={_id} disabled/>
            </div>
            <div class="mb-3 col-lg-3 m-3">
                <label class="form-label">Nombre proyecto</label>
                <input type="text" name="nombre" class="form-control allowEdit" id="nombreProyectoEditable" defaultValue={ queryData.ProyectosPorId[0].nombre } disabled/>
            </div>
            <div class="mb-3 col-lg-3 m-3">
                <label class="form-label">Presupuesto</label>
                <input type="text" name="presupuesto" id="presupuestoId" class="form-control allowEdit" defaultValue={ queryData.ProyectosPorId[0].presupuesto } disabled/>
            </div>
            <div class="mb-3 col-lg-3 m-3">
                <label class="form-label">Fecha inicio</label>
                <input type="text" class="form-control" value={ queryData.ProyectosPorId[0].fechaInicio } disabled/>
            </div>
            <div class="mb-3 col-lg-3 m-3">
                <label class="form-label">Fecha fin</label>
                <input type="text" class="form-control" value={ queryData.ProyectosPorId[0].fechaFin } disabled/>
            </div>
            <div class="mb-3 col-lg-3 m-3">
                <label class="form-label">Estado</label>
                <input type="text" id="estadoId" class="form-control" value={ queryData.ProyectosPorId[0].estado } disabled/>
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
                                <td class="text-center">
                                    <input type="text" class="form-control" value={ u._id.slice(20) } disabled/>
                                </td>
                                <td class="text-center">
                                    <input type="text" name="tipo" class="form-control" defaultValue={ u.tipo }/>
                                </td>
                                <td class="text-center">
                                    <input type="text" name="descripcion" class="form-control" defaultValue={u.descripcion }/>
                                </td>
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

                <button type="button" id="btnEditarProyecto" class="btn btn-primary" onClick={habilitarEdicionProyecto}>Editar</button>    
                <button type="submit" id="btnGuardarCambiosProyecto" class="btn btn-warning">Guardar cambios</button>    
            </div>
            </form>
        </div>
    )
}

export default MostrarProyectoXId

