import { gql } from "@apollo/client";

const CREAR_INSCRIPCION = gql`
  mutation CrearInscripcion($proyecto: String, $estudiante: String) {
    crearInscripcion(proyecto: $proyecto, estudiante: $estudiante) {
      _id
      estado
      fechaIngreso
      fechaEgreso
    }
  }
`;

const EDITAR_AVANCE = gql`
  mutation EditarAvance($_id: String!, $fecha: Date!, $descripcion: String!) {
    editarAvance(_id: $_id, fecha: $fecha, descripcion: $descripcion) {
      descripcion
      fecha
      _id
      observaciones
    }
  }
`;

const CREAR_AVANCE = gql`
  mutation CrearAvance(
    $fecha: Date!
    $descripcion: String!
    $proyecto: String!
    $creadoPor: String!
  ) {
    crearAvance(
      fecha: $fecha
      descripcion: $descripcion
      proyecto: $proyecto
      creadoPor: $creadoPor
    ) {
      descripcion
      _id
      fecha
      observaciones
    }
  }
`;

export { CREAR_INSCRIPCION, EDITAR_AVANCE, CREAR_AVANCE };
