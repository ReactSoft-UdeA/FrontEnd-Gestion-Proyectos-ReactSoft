import { gql } from "@apollo/client";

const REGISTRO = gql`
  mutation Registro(
    $nombre: String!
    $apellido: String!
    $identificacion: String!
    $correo: String!
    $rol: Enum_Rol!
    $clave: String!
  ) {
    registro(
      nombre: $nombre
      apellido: $apellido
      identificacion: $identificacion
      correo: $correo
      rol: $rol
      clave: $clave
    ) { 
        token
        error
    }
  }
`;

const LOGIN = gql`
  mutation Login(
    $correo: String!
    $clave: String!
  ){
    login(
      correo: $correo
      clave: $clave
    ){
      token
      error
    }
  }

`

export {REGISTRO, LOGIN};