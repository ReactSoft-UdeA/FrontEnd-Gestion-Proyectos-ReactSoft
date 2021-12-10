import React,{useEffect} from 'react'
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { GET_PROYECTOXID_DETALLE } from 'graphql/proyectos/queries';


const MostrarProyectoXIdAvances = () => {

    const {_id} = useParams();
    /* const {data: queryData, error: queryError, loading: queryLoading} = useQuery(GET_USUARIO, {
        variables: {_id},
    }); */

    const {data: queryData, error: queryError, loading: queryLoading} = useQuery(GET_PROYECTOXID_DETALLE, {
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

<div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        PROYECTO
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Accordion Item #2
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Accordion Item #3
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
</div>


            <div class="col-lg-11 m-10 d-flex flex-wrap align-items-start">
                <h1 class="col-lg-12 bg-info p-1"><strong>PROYECTO</strong></h1>
                <br/>
            <div class="mb-3 col-lg-3 m-3">
                <label for="exampleFormControlInput1" class="form-label">Id Proyecto</label>
                <input type="text" class="form-control" value={_id} disabled/>
            </div>
            <div class="mb-3 col-lg-3 m-3">
                <label for="exampleFormControlInput1" class="form-label">Nombre proyecto</label>
                <input type="text" class="form-control" value={ queryData.ProyectosPorId[0].nombre }/>
            </div>
            <div class="mb-3 col-lg-3 m-3">
                <label for="exampleFormControlInput1" class="form-label">Presupuesto</label>
                <input type="text" class="form-control" value={ queryData.ProyectosPorId[0].presupuesto }/>
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
                <input type="text" class="form-control" value={ queryData.ProyectosPorId[0].estado }/>
            </div>
                <b/>
                <h2 class="col-lg-12 mb-3 bg-info p-1"><strong>OBJETIVOS</strong></h2>

            
            <table class="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">ID OBJETIVO</th>
                    <th scope="col">TIPO</th>
                    <th scope="col">DESCRIPCIÓN</th>
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
                        </tr>
                    );           
                   
                    })}
                </tbody>
                </table>

                <b/>
                <h2 class="col-lg-12 mb-3 bg-info p-1"><strong>AVANCES</strong></h2>    

                <table class="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">ID OBJETIVO</th>
                    <th scope="col">TIPO</th>
                    <th scope="col">DESCRIPCIÓN</th>
                    </tr>
                </thead>
                <tbody>

                {queryData &&
                queryData.ProyectosPorId[0].avances.map((u) => {
        
                    return (
                        <tr key={u._id}>
                            {/* <th scope="row" className="text-center">{u._id.slice(20)}</th> */}
                                <td class="text-center">{u._id.slice(20)}</td>
                                <td class="text-center">{u.fechaAvance}</td>
                                <td class="text-center">{u.descripcion}</td>
                                
                        </tr>
                    );           
                   
                    })}
                </tbody>
                </table>


                <b/>
                <h2 class="col-lg-12 mb-3 bg-info p-1"><strong>INSCRIPCIONES</strong></h2>    
                <table class="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">ID INSCRIPCIÓN</th>
                    <th scope="col">ESTUDIANTE</th>
                    <th scope="col">FECHA INGRESO</th>
                    <th scope="col">ESTADO</th>
                    <th scope="col">OPCIONES</th>
                    </tr>
                </thead>
                <tbody>

                {queryData &&
                queryData.ProyectosPorId[0].inscripciones.map((u) => {
        
                    return (
                        <tr key={u._id}>
                            {/* <th scope="row" className="text-center">{u._id.slice(20)}</th> */}
                                <td class="text-center">{u._id.slice(20)}</td>
                                <td class="text-center"></td>
                                <td class="text-center">{u.fechaIngreso}</td>
                                <td class="text-center">{u.estado}</td>
                                <td class="text-center">
                                <Link to ={`/proyecto/mostrar/${u._id}`} >
                                        <i class='fas fa-pen input-group justify-content-around'></i>
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

export default MostrarProyectoXIdAvances

