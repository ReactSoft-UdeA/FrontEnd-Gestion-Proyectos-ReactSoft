import { gql } from '@apollo/client';

const EDITAR_PROYECTO = gql`
mutation EditarProyecto(
    $_id: String!
    $nombre: String!
    $presupuesto: Float!
    $objetivos: [actualizarObjetivo]
    ){
    editarProyecto(
        _id : $_id
        nombre : $nombre
        presupuesto : $presupuesto
        objetivos: $objetivos
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

export { EDITAR_PROYECTO };