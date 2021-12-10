import {gql} from '@apollo/client'

const GET_PROYECTOS =gql `
query{
  ProyectosPorLider(_id: "6195156ba02a705cdb6575c5") {
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

const GET_PROYECTOXID =gql `
query{
  ProyectosPorId(_id: "61b0ca6258adfa7c5d6e3491") {
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

const GET_PROYECTOXID_DETALLE =gql `
query{
  ProyectosPorId(_id: "61b0ca6258adfa7c5d6e3491") {
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
      fechaAvance
      descripcion
    }
    inscripciones{
      _id
      fechaIngreso
      estado
    }
  }
}
`;

export {GET_PROYECTOS, GET_PROYECTOXID, GET_PROYECTOXID_DETALLE}