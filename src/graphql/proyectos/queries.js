import { gql } from "@apollo/client";

const PROYECTOS = gql`
  query Proyectos {
    Proyectos {
      _id
      nombre
      estado
      objetivos {
        descripcion
        tipo
      }
      lider {
        _id
        correo
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
      objetivos {
        _id
        tipo
        descripcion
      }
    }
  }
`;

const GET_PROYECTOS = gql`
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
      identificacion
      nombre
      apellido
      correo
      rol
    }
    objetivos {
      tipo
      descripcion
    }
  }
}
`;

const GET_PROYECTO = gql`
query Proyecto($_id: String!) {
  ProyectoEstadoFase(_id: $_id) {
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

export { PROYECTOS, GET_PROYECTO_INSCRIPCION, GET_PROYECTOS, GET_PROYECTO };
