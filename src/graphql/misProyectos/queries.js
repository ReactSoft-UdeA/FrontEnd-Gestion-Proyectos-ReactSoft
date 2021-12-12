import { gql } from "@apollo/client";

const GET_PROYECTOS = gql`
  query {
    ProyectosPorLider(_id: "61b161a386185f959c08fb02") {
      _id
      nombre
      presupuesto
      fechaInicio
      fechaFin
      estado
      fase
      lider {
        nombre
      }
    }
  }
`;

export { GET_PROYECTOS };
