import {gql} from '@apollo/client';

const GET_USUARIOS = gql `
  query BuscarUsuarios {
    Usuarios {
      _id
      nombre
      apellido
      correo
      estado
      identificacion
      rol
    }
  }
`;

const GET_USUARIO = gql `
    query BuscarUserPorID ($_id: String!) {
        Usuario (_id: $_id){
            _id
            nombre
            apellido
            correo
            estado
            identificacion
            rol
        }
    }
`;

export {GET_USUARIOS, GET_USUARIO};