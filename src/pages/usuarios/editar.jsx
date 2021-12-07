import React from 'react'
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USUARIO } from 'graphql/usuarios/queries';

const EditarUsuario = () => {
    
    const {_id} = useParams();
    const {data, error, loading} = useQuery(GET_USUARIO, {
        variables: {_id},
    });


    if (loading) return <h1 className="text-center display-1 h1"> Cargando!!</h1>

    
    console.log(data);
    return (
        <div>
            
        </div>
    );
};

export default EditarUsuario;
