import React, { useState } from "react";
import PrivateLayout from "layouts/PrivateLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "context/userContext";
import { autContext } from "context/autContext";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
// import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Index from "pages/Index";
import Page2 from "pages/Page2";
import ObtenerProyectos from "pages/proyectos/ObtenerProyectos";
import IndexCategory1 from "pages/category1/Index";
import Category1 from "pages/category1/CategoryPage1";
import "styles/globals.css";
import IndexUsuarios from "pages/usuarios";
import EditarUsuario from "pages/usuarios/editar";
import MostrarProyectoXId from "pages/proyectos/MostrarProyectoXId";
import MostrarProyectoXIdAvances from "pages/proyectos/MostrarProyectoXIdAvances";
import AuthLayout from "layouts/AuthLayout";
import Register from "pages/auth/register";
import Login from "pages/auth/login";
import IndexProyectosUsuarios from "pages/proyectosUsuarios";
import { Token } from "graphql";

// import PrivateRoute from 'components/PrivateRoute';

//funcion para pasar la url del servidor de apollo, ademas sirven para agregar los tokens del backend
// const httpLink = createHttpLink ({
//   uri: 'https://servidor-graphql-mintic-leo.herokuapp.com/graphql'
// });

// crear una variable del cliens de apollo
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  const [userData, setUserData] = useState({});
  const [autToken, setAutToken] = useState('');

  const setToken = (token) =>{
    setAutToken(token);
    if(token){
      localStorage.setItem('token', JSON.stringify(token));
    }

  }


  return (
    <ApolloProvider client={client}>
      <autContext.Provider value={{setToken}}>  
        <UserContext.Provider value={{ userData, setUserData }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<PrivateLayout />}>
                <Route path="" element={<Index />} />
                <Route path="/usuarios" element={<IndexUsuarios />} />
                <Route path="/usuarios/editar/:_id" element={<EditarUsuario />} />
                <Route path="page2" element={<Page2 />} />
                <Route path="/proyectos" element={<ObtenerProyectos />} />
                <Route
                  path="/proyectosUsuarios"
                  element={<IndexProyectosUsuarios />}
                />
                <Route
                  path="/proyecto/mostrar/:_id"
                  element={<MostrarProyectoXId />}
                />
                <Route
                  path="/proyecto/detalle/:_id"
                  element={<MostrarProyectoXIdAvances />}
                />
                <Route path="/inscripciones" element={<MostrarProyectoXId />} />
                <Route path="category1" element={<IndexCategory1 />} />
                <Route path="category1/page1" element={<Category1 />} />
              </Route>
              <Route path="/auth" element={<AuthLayout />}>
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </autContext.Provider>
    </ApolloProvider>
  );
}

export default App;
