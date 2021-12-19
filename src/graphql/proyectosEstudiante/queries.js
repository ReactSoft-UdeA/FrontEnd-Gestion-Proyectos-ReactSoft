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

const PROYECTOS = gql`
  query Proyectos {
    Proyectos {
      _id
      nombre
      presupuesto
      fechaInicio
      fechaFin
      estado
      fase
      lider {
        _id
        nombre
        correo
      }
      objetivos {
        descripcion
        tipo
      }
      inscripciones {
        estado
        estudiante {
          _id
          nombre
        }
      }
    }
  }
`;

const GET_PROYECTO_INSCRIPCION = gql`
  query ProyectosPorId($_id: String!) {
    ProyectosPorId(_id: $_id) {
      _id
      estado
      nombre
      inscripciones {
        estado
        estudiante {
          _id
          nombre
        }
      }
    }
  }
`;

const GET_PROYECTOS_INSCRITOS = gql`
  query ProyectosInscritos($id: String!) {
    ProyectosInscritos(_id: $id) {
      _id
      estado
      proyecto {
        _id
        nombre
        lider {
          nombre
        }
      }
      estudiante {
        nombre
        apellido
      }
    }
  }
`;

const GET_AVANCES = gql`
  query FiltrarAvance($_id: String!) {
    filtrarAvance(_id: $_id) {
      _id
      fecha
      descripcion
      proyecto {
        nombre
      }
      observaciones
      creadoPor {
        nombre
        apellido
        estado
      }
    }
  }
`;

const GET_AVANCE = gql`
  query Avance($_id: String!) {
    Avance(_id: $_id) {
      fecha
      descripcion
      _id
      observaciones
    }
  }
`;

export {
  GET_PROYECTOS_USUARIO,
  GET_PROYECTO_INSCRIPCION,
  GET_PROYECTOS_INSCRITOS,
  GET_AVANCES,
  GET_AVANCE,
  PROYECTOS,
};
