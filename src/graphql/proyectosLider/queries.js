import { gql } from "@apollo/client";

const GET_PROYECTOS_LIDER = gql`
  query ProyectosPorLider($id: String!) {
    ProyectosPorLider(_id: $id) {
      _id
      nombre
      fechaInicio
      presupuesto
      fechaFin
      estado
      fase
      lider {
        nombre
        apellido
      }
    }
  }
`;

export { GET_PROYECTOS_LIDER };
