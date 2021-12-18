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

export { EDITAR_PROYECTO_LIDER };