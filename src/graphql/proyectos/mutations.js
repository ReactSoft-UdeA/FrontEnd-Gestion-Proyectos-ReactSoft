import { gql } from '@apollo/client';

const EDITAR_PROYECTO = gql`
mutation EditarProyecto(
    $_id: String!
    $nombre: String!
    $presupuesto: Float!
    ){
    editarProyecto(
        _id : $_id
        nombre : $nombre
        presupuesto : $presupuesto
    ){
        _id
        nombre
        presupuesto
        fechaInicio
        fechaFin
        estado
        fase
    }
    }
`;

export { EDITAR_PROYECTO };