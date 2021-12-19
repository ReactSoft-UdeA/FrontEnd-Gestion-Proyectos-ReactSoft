import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { PROYECTOS } from 'graphql/proyectos/queries';
import DropDown from 'components/Dropdown';
import { Dialog } from '@mui/material';
import useFormData from 'hooks/useFormData';
import PrivateComponent from 'components/PrivateComponent';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AccordionStyled, AccordionSummaryStyled, AccordionDetailsStyled, } from 'components/Accordion';
import { EDITAR_OBJETIVO, ELIMINAR_OBJETIVO } from '../../graphql/proyectos/mutations';
import { ProjectQueryContext, useProjectQuery } from '../../context/projectQueryContext';
import ReactLoading from "react-loading";
import Input from 'components/Input';
import { Enum_TipoObjetivo } from '../../utils/enums';

const IndexProyectos = () => {
  const { data: queryData, loading, error, refetch } = useQuery(PROYECTOS);

  useEffect(() => {
    console.log('datos proyecto', queryData);
    refetch();
  }, [queryData]);

  if (loading) return <div>Cargando...</div>;

  if (queryData.Proyectos) {
    return (
      <ProjectQueryContext.Provider value={{queryData, refetch}} >
      <div className='p-10 flex flex-col'>
        <div className='flex w-full items-center justify-center'>
          <h1 className='text-4xl font-bold text-gray-900'>Lista de Proyectos con Objetivos</h1>
        </div>
        {/* <PrivateComponent roleList={['ADMINISTRADOR', 'LIDER']}> */}
        <PrivateComponent roleList={['LIDER']}>
          <div className='my-2 self-end'>
            <button className='btn btn-outline-success'>
              <Link className="text-green hover:text-white" to='/proyectos/nuevo'>Crear Proyecto</Link>
            </button>
          </div>
        </PrivateComponent>
        {queryData.Proyectos.map((proyecto) => {
          return <AccordionProyecto proyecto={proyecto} />;
        })}
      </div>
      </ProjectQueryContext.Provider>
    );
  }

  return <></>;
};

const AccordionProyecto = ({ proyecto }) => {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <>
      <AccordionStyled>
        <AccordionSummaryStyled expandIcon={<i className='text-blue-600 fas fa-hand-point-down' />}>
          <div className='justify-center'>
            <div className='font-bold text-black-100'>
              {proyecto.nombre}
            </div>
            <div className='flex text-black-100'>
              Estado Proyecto:  .<div className="font-bold ">{proyecto.estado}</div> 
            </div>
          </div>
        </AccordionSummaryStyled>
        <AccordionDetailsStyled>
          <div className="font-sans font-bold">Este proyecto se encuentra liderado Por: </div>
          <div className="font-sans">{proyecto.lider.correo}</div>
          <div className=''>
            {proyecto.objetivos.map((objetivo, index) => {
              return <Objetivo index={index} _id={objetivo._id} idProyecto={proyecto._id} tipo={objetivo.tipo} descripcion={objetivo.descripcion} />;
            })}
          </div>
        </AccordionDetailsStyled>
      </AccordionStyled>
      <Dialog
        open={showDialog}
        onClose={() => {
          setShowDialog(false);
        }}
      >
      </Dialog>
    </>
  );
};


const Objetivo = ({ index, _id, idProyecto, tipo, descripcion }) => {

  const {refetch} = useProjectQuery();

  const [showEditDialog, setShowEditDialog] = useState (false);

  const [eliminarObjetivo, { data: dataMutationEliminar, loading: eliminarLoading }] = useMutation(ELIMINAR_OBJETIVO);

  useEffect(() => {
    console.log('Eliminar Objetivo', dataMutationEliminar);
    if (dataMutationEliminar) {
      refetch();
      toast.success('Objetivo Eliminado');
    }
  }, [dataMutationEliminar, refetch]);

  const ejecutarEliminacion = ()=> {
    eliminarObjetivo({variables:{ idProyecto, idObjetivo: _id }})
  }

  if(eliminarLoading) return <ReactLoading type="spin" height={50} width={50} />

  return (
    <div>
      <table class="table table-hover table-primary text-center">
        <thead>
          <tr>
            {/* <th scope="col">#</th>
            <th scope="col">First</th> */}
            <th scope="col">Tipo</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr className="table-secondary ">
            {/* <th scope="row">1</th>
            <td>Mark</td> */}
            <td>{tipo}</td>
            <td>{descripcion}</td>
            <td>
              <PrivateComponent roleList={['LIDER']}>
                <div className="">
                  <i onClick={() => setShowEditDialog(true)} className="far fa-edit mx-2 hover:text-green-600 cursor-pointer" />
                  <i onClick={ejecutarEliminacion} className="fas fa-minus-circle mx-2 hover:text-red-600 cursor-pointer" />
                </div>
                <Dialog open={showEditDialog} onClose={() => setShowEditDialog(false)} >
                  <EditarObjetivo descripcion={descripcion} tipo={tipo} index={index} idProyecto={idProyecto} setShowEditDialog={setShowEditDialog} />

                </Dialog>
              </PrivateComponent>
            </td>
          </tr>
        </tbody>

      </table>

    </div>
  );
};

const EditarObjetivo = ({ descripcion, tipo, index, idProyecto, setShowEditDialog }) => {

  const {refetch} = useProjectQuery();

  const { form, formData, updateFormData } = useFormData();

  const [editatObjetivo, { data: dataMutation }] = useMutation(EDITAR_OBJETIVO);

  useEffect(() => {
    if (dataMutation){
      toast.success('El Objetivo fue modificado');
      setShowEditDialog(false);
      refetch();
    }
    // console.log('Edicion Objetivo ', dataMutation)
  }, [dataMutation])

  const submitForm = (e) => {
    e.preventDefault()
    editatObjetivo({variables: {
      idProyecto,
      indexObjetivo: index,
      campos: formData,
    }})
  }

  return (
    <div className='p-20'>
      <h1 className='text-4xl'>Editar Objetivo Proyecto</h1>
      <form ref={form} onChange={updateFormData} onSubmit={submitForm} >

        <DropDown label='Tipo de Objetivo' name='tipo' required={true} options={Enum_TipoObjetivo} defaultValue={tipo} />
        <Input label='Descripcion Del Objetivo' name='descripcion' required={true} defaultValue={descripcion} />
        <button type="submit" onClick = {() => {}} className="btn btn-primary">Editar </button>
      </form>
    </div>
  )
}


export default IndexProyectos;
