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

const GET_PROYECTOS_DETALLE = gql`
  query ProyectosPorId($_id: String!) {
    ProyectosPorId(_id: $_id) {
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
      avances {
        _id
        fecha
        descripcion
        observaciones
      }
      inscripciones {
        _id
        estudiante {
        _id
        nombre
        apellido
        identificacion
        correo
      }
        fechaIngreso
        estado
      }
    }
  }
`;

export { GET_PROYECTOS_LIDER, GET_PROYECTOS_DETALLE };
