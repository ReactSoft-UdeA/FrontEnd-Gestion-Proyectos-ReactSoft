import React, { useState, useEffect  } from 'react';
import PrivateLayout from 'layouts/PrivateLayout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from 'context/userContext';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
// import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Index from 'pages/Index';
import Page2 from 'pages/Page2';
import IndexCategory1 from 'pages/category1/Index';
import Category1 from 'pages/category1/CategoryPage1';
import 'styles/globals.css';
import Login from 'pages/auth/login';
import IndexUsuarios from 'pages/usuarios';
import EditarUsuario from 'pages/usuarios/editar';
import jwt_decode from 'jwt-decode';
import AuthLayout from 'layouts/AuthLayout';
import { AuthContext } from 'context/authContext';
import Register from 'pages/auth/register';
import IndexInscripciones from 'pages/inscripciones';
import IndexProyectos from 'pages/proyectos/Index';
import NuevoProyecto from 'pages/proyectos/NuevoProyecto'
import 'styles/globals.css';
import 'styles/tabla.css';;
// import PrivateRoute from 'components/PrivateRoute';


//funcion para pasar la url del servidor de apollo, ademas sirven para agregar los tokens del backend
// const httpLink = createHttpLink ({
//   uri: 'https://servidor-graphql-mintic-leo.herokuapp.com/graphql'
// });

// crear una variable del cliens de apollo
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = JSON.parse(localStorage.getItem('token'));
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

function App() {
  const [userData, setUserData] = useState({});
  const [authToken, setAuthToken] = useState('');

  const setToken = (token) => {
    console.log('set token', token);
    setAuthToken(token);
    if (token) {
      localStorage.setItem('token', JSON.stringify(token));
    } else {
      localStorage.removeItem('token');
    }
  };

  useEffect(() => {
    if (authToken) {
      const decoded = jwt_decode(authToken);
      setUserData({
        _id: decoded._id,
        nombre: decoded.nombre,
        apellido: decoded.apellido,
        identificacion: decoded.identificacion,
        correo: decoded.correo,
        rol: decoded.rol,
      });
    }
  }, [authToken]);

  return (
      <ApolloProvider client ={ client }>
        <AuthContext.Provider value={{ authToken, setAuthToken, setToken }}>
          <UserContext.Provider value={{ userData, setUserData }}>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<PrivateLayout />}>
                  <Route path='' element={<Index />} />
                  <Route path='/proyectos' element={<IndexProyectos />} />
                  <Route path='/proyectos/nuevo' element={<NuevoProyecto />} />
                  <Route path='/usuarios' element={<IndexUsuarios />} />
                  <Route path='/usuarios/editar/:_id' element={<EditarUsuario />} />
                  <Route path='/inscripciones' element={<IndexInscripciones />} />
                  <Route path='page2' element={<Page2 />} />
                  <Route path='category1' element={<IndexCategory1 />} />
                  <Route path='category1/page1' element={<Category1 />} />
                </Route>
                <Route path = '/auth' element = {<AuthLayout />}>
                  <Route path='login' element={<Login />} />
                  <Route path ='register' element = {<Register />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </UserContext.Provider>
        </AuthContext.Provider>
      </ApolloProvider>

  );
}

export default App;
