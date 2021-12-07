import React, { useState } from 'react';
import PrivateLayout from 'layouts/PrivateLayout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from 'context/userContext';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Index from 'pages/Index';
import Page2 from 'pages/Page2';
import IndexCategory1 from 'pages/category1/Index';
import Category1 from 'pages/category1/CategoryPage1';
import 'styles/globals.css';
import IndexUsuarios from 'pages/usuarios';
import EditarUsuario from 'pages/usuarios/editar';

// import PrivateRoute from 'components/PrivateRoute';


//funcion para pasar la url del servidor de apollo, ademas sirven para agregar los tokens del backend
// const httpLink = createHttpLink ({
//   uri: 'https://servidor-graphql-mintic-leo.herokuapp.com/graphql'
// });

// crear una variable del cliens de apollo
const client = new ApolloClient ({
  uri: 'https://servidor-graphql-mintic-leo.herokuapp.com/graphql',
  cache : new InMemoryCache()
});

function App() {
  const [userData, setUserData] = useState({});

  return (
      <ApolloProvider client ={ client }>
        <UserContext.Provider value={{ userData, setUserData }}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<PrivateLayout />}>
                <Route path='' element={<Index />} />
                <Route path='/usuarios' element={<IndexUsuarios />} />
                <Route path='/usuarios/editar/:_id' element={<EditarUsuario />} />
                <Route path='page2' element={<Page2 />} />
                <Route path='category1' element={<IndexCategory1 />} />
                <Route path='category1/page1' element={<Category1 />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </ApolloProvider>

  );
}

export default App;
