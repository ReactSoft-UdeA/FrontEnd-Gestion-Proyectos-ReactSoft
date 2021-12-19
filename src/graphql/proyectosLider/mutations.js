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

const EDITAR_OBJETIVO = gql `
mutation Mutation($idProyecto: String!, $indexObjetivo: Int!, $campos: camposObjetivo!) {
    editarObjetivo(idProyecto: $idProyecto, indexObjetivo: $indexObjetivo, campos: $campos) {
      objetivos {
        _id
        descripcion
        tipo
      }
    }
  }
`;


export { EDITAR_PROYECTO_LIDER , ADD_OBSERVACION_AVANCE, EDITAR_OBJETIVO};