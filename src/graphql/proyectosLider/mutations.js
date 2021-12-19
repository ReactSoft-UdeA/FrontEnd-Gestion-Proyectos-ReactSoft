import { gql } from '@apollo/client';

const EDITAR_PROYECTO_LIDER = gql`
mutation EditarProyecto(
    $_id: String!
    $nombre: String!
    $presupuesto: Float!
    ){
    editarProyecto(
        _id : $_id
        campos:{
        nombre : $nombre
        presupuesto : $presupuesto
        }
    ){
        _id
        nombre
        presupuesto
        fechaInicio
        fechaFin
        estado
        fase
        objetivos {
            _id
            descripcion
            tipo
        }
    }
    }
`;


const ADD_OBSERVACION_AVANCE = gql`
mutation Mutation($_id: String!, $observaciones: String) {
    editarAvance(_id: $_id, observaciones: $observaciones) {
      _id
      observaciones
    }
  }
`;

export { EDITAR_PROYECTO_LIDER , ADD_OBSERVACION_AVANCE};