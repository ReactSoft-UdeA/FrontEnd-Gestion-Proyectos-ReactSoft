import React, { useEffect } from "react";
import PrivateRoute from "components/PrivateRoute";
import { useQuery } from "@apollo/client";
import { GET_PROYECTOS } from "../../graphql/proyectos/queries";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const IndexProyectosAdmin = () => {
  const { data, error, loading } = useQuery(GET_PROYECTOS);

  useEffect(() => {
    console.log("Data Servidor", data);
    //refetch();
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error("Error en la consulta de los Proyectos");
    }
  }, [error]);

  if (loading) return <h1 className="text-center display-1 h1"> Cargando!!</h1>;

  return (
    <div class="bg-gradient-to-r from-blue-500 to-green-500 rounded-lg px-6 py-8 ring-1 ring-gray-900/5 shadow-xl">
      <div>
        <PrivateRoute roleList={["ADMINISTRADOR"]}>
          <h1 className="text-7xl text-gray-900 text-white font-medium tracking-tight text-center">
            Proyectos Registrados
          </h1>

          <div>
            {/* <h1 className="text-center display-1 h1 pt-10">ReactSoft</h1> */}
            <div className="container pt-10">
              <table className="table table-success table-striped table-hover align-middle table-bordered ">
                <thead className="table-primary ">
                  <tr className="">
                    <th scope="col" className="text-center">
                      ID
                    </th>
                    <th scope="col" className="text-center">
                      Nombre
                    </th>
                    <th scope="col" className="text-center">
                      Presupuesto
                    </th>
                    <th scope="col" className="text-center">
                      Fecha Inicio
                    </th>
                    <th scope="col" className="text-center">
                      Fecha Fin
                    </th>
                    <th scope="col" className="text-center">
                      Estado
                    </th>
                    <th scope="col" className="text-center">
                      Fase
                    </th>
                    <th scope="col" className="text-center">
                      Editar
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.Proyectos.map((p) => {
                      return (
                        <tr key={p._id}>
                          {/* <th scope="row" className="text-center">{p._id.slice(20)}</th> */}
                          <td className="text-center">{p._id.slice(20)}</td>
                          <td className="text-center">{p.nombre}</td>
                          <td className="text-center">{p.presupuesto}</td>
                          <td className="text-center">
                            {p.fechaInicio.slice(0, 10)}
                          </td>
                          <td className="text-center">
                            {p.fechaFin.slice(0, 10)}
                          </td>
                          <td className="text-center">{p.estado}</td>
                          <td className="text-center">{p.fase}</td>
                          <td>
                            <Link to={`/proyectosAdmin/editar/${p._id}`}>
                              <i className="fas fa-pen input-group justify-content-around "></i>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </PrivateRoute>
      </div>
    </div>
  );
};

export default IndexProyectosAdmin;
