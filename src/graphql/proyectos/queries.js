import {gql} from '@apollo/client'

const GET_PROYECTOS =gql `
query ProyectoPorLider($_id:String!){
    ProyectosPorLider(_id: $_id) {
      _id
      nombre
      presupuesto
      fechaInicio
      fechaFin
      estado
    }
  }

`;

export {GET_PROYECTOS}