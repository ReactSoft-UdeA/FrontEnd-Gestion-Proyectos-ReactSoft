import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PROYECTO } from "../../graphql/proyectos/queries";
import ButtonLoading from "components/ButtonLoading";
import useFormData from "hooks/useFormData";
import { EDITAR_PROYECTO_FASE_ESTADO } from "../../graphql/proyectos/mutations";
import { toast } from "react-toastify";
import DropDown from "components/Dropdown";
import { Enum_EstadoProyecto, Enum_FaseProyecto } from "../../utils/enums";
//import { useNavigate } from "react-router";

const EditarEstadoFase = () => {
  //const navigate = useNavigate();

  const { form, formData, updateFormData } = useFormData(null);

  const { _id } = useParams();

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_PROYECTO, {
    variables: { _id },
  });

  const [
    editarProyectoFaseEstado,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(EDITAR_PROYECTO_FASE_ESTADO);

  const submitForm = (e) => {
    e.preventDefault();
    console.log("fd", formData);
    // delete formData.rol;
    editarProyectoFaseEstado({
      variables: { _id, ...formData },
    });
  };

  useEffect(() => {
    if (mutationData) {
      toast.success("El Proyecto se editó Exitosamente!!");
      //navigate("/proyectosAdmin");
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error("Error modificando el proyecto");
    }

    if (queryError) {
      toast.error("Error consultando el proyecto");
    }
  }, [queryError, mutationError]);

  if (queryLoading)
    return <h1 className="text-center display-1 h1"> Cargando!!</h1>;

  return (
    <div class="bg-gradient-to-r from-blue-500 to-green-500 rounded-lg px-6 py-8 ring-1 ring-gray-900/5 shadow-xl">
      <div className="flew flex-col w-full h-full items-center justify-center p-11">
        {/* <Link to='/usuarios'>
                    <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
                </Link> */}
        {/* <button type="button" class="btn btn-outline-primary">
            <Link to="/proyectosAdmin">Atras </Link>
            </button> */}
        <h1 className="text-7xl text-gray-900 text-white font-medium tracking-tight text-center">
          Editar Estado Y Fase De Proyecto
        </h1>

        <form onSubmit={submitForm} onChange={updateFormData} ref={form}>
          <div class="container">
            <div class="row">
              <div class="col">
                {/* Column1 */}
                {/* <Input label="Nombre:" type="text" name="nombre" defaultValue={queryData.Proyecto.nombre} required={true} disabled readonly /> */}
                <h6 className="text-center p-3 font-bold">
                  Nombre Del Proyecto
                </h6>
                <input
                  className="form-control text-center"
                  type="text"
                  name="nombre"
                  defaultValue={queryData.ProyectoEstadoFase.nombre}
                  disabled
                  readonly
                />
                <h6 className="text-center p-1 mt-2 font-bold">
                  Fecha Inicio Proyecto
                </h6>
                <input
                  className="form-control text-center"
                  type="text"
                  name="fechaInicio"
                  defaultValue={queryData.ProyectoEstadoFase.fechaInicio}
                  disabled
                  readonly
                />
                <DropDown
                  label="Estado Del Proyecto:"
                  name="estado"
                  defaultValue={queryData.ProyectoEstadoFase.estado}
                  required={true}
                  options={Enum_EstadoProyecto}
                />
              </div>
              <div class="col">
                {/* Column2 */}
                {/* <Input label="Presupuesto:" type="text" name="presupuesto" defaultValue={queryData.Proyecto.presupuesto} required={true} /> */}
                <h6 className="text-center p-3 font-bold">
                  Presupuesto Del Proyecto
                </h6>
                <input
                  className="form-control text-center"
                  type="text"
                  name="presupuesto"
                  defaultValue={queryData.ProyectoEstadoFase.presupuesto}
                  disabled
                  readonly
                />
                <h6 className="text-center p-1 mt-2 font-bold">
                  Fecha Fin Proyecto
                </h6>
                <input
                  className="form-control text-center"
                  type="text"
                  name="fechaFin"
                  defaultValue={queryData.ProyectoEstadoFase.fechaFin}
                  disabled
                  readonly
                />
                <DropDown
                  label="Fase Del Proyecto:"
                  name="fase"
                  defaultValue={queryData.ProyectoEstadoFase.fase}
                  required={true}
                  options={Enum_FaseProyecto}
                />
              </div>
            </div>
          </div>
          <div className="container d-flex justify-content-center mt-5">
            {/* <ButtonLoading disabled={false} loading={false} text="Confirmar Cambio" /> */}
            <ButtonLoading
              disabled={Object.keys(formData).length === 0}
              loading={mutationLoading}
              text="Confirmar Cambio"
            />
            {/* <button type="button" class="btn btn-outline-primary"> <Link to="/proyectosAdmin">Atras </Link> </button> */}
          </div>
          <div className="container d-flex justify-content-center mt-5">
            {/* <ButtonLoading disabled={false} loading={false} text="Confirmar Cambio" /> */}
            {/* <ButtonLoading disabled={Object.keys(formData).length === 0} loading={mutationLoading} text="Confirmar Cambio" /> */}
            <button
              type="button"
              class="btn btn-outline-primary bg-gradient-r green-100 text-white text-bold"
            >
              {" "}
              <Link to="/proyectosAdmin">Atras </Link>{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarEstadoFase;
