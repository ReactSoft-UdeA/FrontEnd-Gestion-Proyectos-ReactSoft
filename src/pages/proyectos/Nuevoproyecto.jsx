import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import Input from "components/Input";
import { useMutation, useQuery } from '@apollo/client';
import { GET_USUARIOS } from 'graphql/usuarios/queries';
import DropDown from 'components/Dropdown';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { Enum_TipoObjetivo } from 'utils/enums';
import { nanoid } from 'nanoid';
import { ObjContext } from 'context/objContext';
import { useObj } from 'context/objContext';
import { CREAR_PROYECTO } from 'graphql/proyectos/mutations';
import { useNavigate } from 'react-router';
import { toast } from "react-toastify";

const NuevoProyecto = () => {

    const navigate = useNavigate();

    const {form, formData, updateFormData} = useFormData();

    const [listaUsuarios, setListaUsuarios] = useState({});

    const {data, loading, error} = useQuery(GET_USUARIOS,{
        variables:{
            filtro: {rol: 'LIDER', estado: 'AUTORIZADO'}
        }
    });

    const [crearProyecto, { data: mutationData, loading: mutationLoading, error: mutationError }] = useMutation(CREAR_PROYECTO);

    useEffect(() => {
        console.log(data);
        if (data){
            const lu = {};
            data.Usuarios.forEach((elemento) =>{
                lu[elemento._id] = [elemento.identificacion, " - " ,elemento.nombre, " ", elemento.apellido, " - ", elemento.correo];
                // lu[elemento._id] = elemento.correo;
            });
            setListaUsuarios(lu);
        }
        }, [data]);

        useEffect(() => {
            console.log('data mutation', mutationData);
        });        

        const submitForm = (e) => {
            e.preventDefault();
            formData.objetivos = Object.values(formData.objetivos);
            formData.presupuesto = parseFloat(formData.presupuesto);
            crearProyecto({
                variables: formData,
            });
        };

        
        useEffect(() => {
            if (mutationData) {
                toast.success("El Proyecto Creado Exitosamente!!");
                navigate("/proyectosUsuarios");
            }
        }, [mutationData]);
        
        if (loading) return <h1 className="text-center display-1 h1"> Cargando!!</h1>;
        
    return (
        <div className = "p-10">

            <button type = "button" class="btn btn-outline-primary ">
                <Link className = "text-white-800" to="/proyectosUsuarios">Ver Proyectos </Link>
            </button>
            <h1 className="m-4 text-3xl text-gray-800 font-bold text-center"></h1>
            <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button  text-3xl font-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Crear Proyecto
                    </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <form ref={form} onChange={updateFormData} onSubmit={submitForm} >
                                <div class="container">
                                    <div class="row">
                                        <div class="col">
                                            {/* Column1 */}
                                            <Input label="Nombre:" type="text" name="nombre" required={true} />
                                        </div>
                                        <div class="col">
                                            {/* Column2 */}
                                            <Input label="Presupuesto:" type="number" name="presupuesto" required={true} />
                                        </div>
                                        <div class="col">
                                            {/* Column3 */}
                                            <Input label="Fecha De Inicio Del Proyecto:" type="date" name="fechaInicio" required={true} />
                                            <Input label="Fecha De Finalizacion Del Proyecto:" type="date" name="fechaFin" required={true} />
                                        </div>
                                    </div>
                                </div>
                                <h2>Seleccionar Lider</h2>
                                <p>Aqui solo apareceran los lideres con estado: "Aceptado"</p>
                                <DropDown options={listaUsuarios} name='lider' required={true} />
                                <Objetivos />
                                <ButtonLoading  text = "Registrar Proyecto" loading={false} disable={false} />
                            </form>
                        
                        
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Objetivos = () =>{



    const [listaObjetivos, setListaObjetivos] = useState([]);

    const eliminarObjetivo = (id) => {
        setListaObjetivos(listaObjetivos.filter((el) => el.props.id !== id));
      };

    const componenteObjetivoAgregado = () => {
    const id = nanoid();
    return <FormObjetivo key={id} id={id} />;
    };

    return(
        <ObjContext.Provider value={{ eliminarObjetivo }}>
            <div>
                <span>Objetivos Del Proyecto</span>
                {/* <i
                onClick={() => setListaObjetivos([...listaObjetivos, componenteObjetivoAgregado()])}
                className='fas fa-plus rounded-full bg-green-500 hover:bg-green-400 text-white p-2 mx-2 cursor-pointer'
                /> */}
                <a onClick={() => setListaObjetivos([...listaObjetivos, componenteObjetivoAgregado()])} class="btn btn-info m-2" href="#" role="button"><i className="fas fa-plus "></i></a>
                {listaObjetivos.map((objetivo) => {
                return objetivo;
                })}
            </div>
        </ObjContext.Provider>
    );
};

const FormObjetivo =({ id }) =>{
    const {eliminarObjetivo} = useObj();
    return(
        <div>
            <div class="container border border-primary m-1 rounded-3">
                <div class="row">
                    <div class="col">
                        {/* Column1 */}
                        <DropDown name={`nested||objetivos||${id}||tipo`} options = {Enum_TipoObjetivo} label='Tipo De Objetivo' />

                    </div>
                    <div class="col">
                        {/* Column2 */}
                        <Input name={`nested||objetivos||${id}||descripcion`} label='Descripcion' type='text' required={true} />

                    </div>
                    <div class="col align-self-center d-flex justify-content-center">
                        {/* Column3 */}
                        {/* <br />
                        <br /> */}
                        {/* <i className="fas fa-trash" onClick={() => eliminarObjetivo(id)} ></i> */}
                        <a class="btn btn-danger m-1" href="#" role="button" onClick={() => eliminarObjetivo(id)} ><i className="fas fa-trash"  ></i></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NuevoProyecto;
