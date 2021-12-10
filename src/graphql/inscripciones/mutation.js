import { gql } from "@apollo/client";

const POST_INSCRIPCION = gql`
  mutation CrearInscripcion(
    $estado: Enum_EstadoInscripcion!
    $proyecto: String!
    $estudiante: String!
  ) {
    crearInscripcion(
      estado: $estado
      proyecto: $proyecto
      estudiante: $estudiante
    ) {
      _id
      estado
      fechaIngreso
      fechaEgreso
      proyecto {
        _id
      }
    }
  }
`;

export { POST_INSCRIPCION };
