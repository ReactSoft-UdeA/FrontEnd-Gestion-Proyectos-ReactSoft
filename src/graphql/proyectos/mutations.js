import { gql } from "@apollo/client";

const EDITAR_PROYECTO = gql`
  mutation Mutation($_id: String!, $campos: camposProyecto!) {
    editarProyecto(_id: $_id, campos: $campos) {
      _id
      estado
    }
  }
`;

const CREAR_PROYECTO = gql`
  mutation CrearProyecto(
    $nombre: String!
    $presupuesto: Float!
    $fechaInicio: Date!
    $fechaFin: Date!
    $lider: String!
    $objetivos: [crearObjetivo]
  ) {
    crearProyecto(
      nombre: $nombre
      presupuesto: $presupuesto
      fechaInicio: $fechaInicio
      fechaFin: $fechaFin
      lider: $lider
      objetivos: $objetivos
    ) {
      _id
    }
  }
`;

const EDITAR_PROYECTO_FASE_ESTADO = gql`
  mutation ProyectoFaseEstado(
    $_id: String!, 
    $estado: Enum_EstadoProyecto!, 
    $fase: Enum_FaseProyecto!
  ) {
    proyectoFaseEstado(
      _id: $_id, 
      estado: $estado, 
      fase: $fase
    ) {
      _id
      estado
      fase
  }
}
`;

export { EDITAR_PROYECTO, CREAR_PROYECTO, EDITAR_PROYECTO_FASE_ESTADO };
