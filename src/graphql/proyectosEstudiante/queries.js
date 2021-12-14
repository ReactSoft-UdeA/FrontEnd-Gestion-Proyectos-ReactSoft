import { gql } from "@apollo/client";

const GET_PROYECTOS_USUARIO = gql`
  query Proyectos {
    Proyectos {
      nombre
      _id
      presupuesto
      fechaInicio
      fechaFin
      estado
      fase
      lider {
        nombre
        correo
      }
    }
  }
`;

// const GET_PROYECTO = gql`
//   query BuscarUserPorID($_id: String!) {
//     Usuario(_id: $_id) {
//       _id
//       nombre
//       apellido
//       correo
//       estado
//       identificacion
//       rol
//     }
//   }
// `;

export { GET_PROYECTOS_USUARIO };
