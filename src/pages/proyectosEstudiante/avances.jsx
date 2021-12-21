//import React, { useEffect } from "react";
import PrivateRoute from "components/PrivateRoute";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_AVANCES } from "graphql/proyectosEstudiante/queries";
//import useFormData from "hooks/useFormData";
//import ButtonLoading from "components/ButtonLoading";
//import { toast } from "react-toastify";

const AvancesEstudiante = () => {
  //  const { form, formData, updateFormData } = useFormData(null);
  const { _id } = useParams();
  const {
    data: queryData,
    // error: queryError,
    loading: queryLoading,
  } = useQuery(GET_AVANCES, {
    variables: { _id },
  });

  if (queryLoading)
    return <h1 className="text-center display-1 h1"> Cargando!!</h1>;

  return (
    <div class="bg-gradient-to-r from-blue-500 to-green-500 rounded-lg px-6 py-8 ring-1 ring-gray-900/5 shadow-xl">
      <div>
        <PrivateRoute roleList={["ESTUDIANTE"]}>
          <div className="flew flex-col w-full h-full items-center justify-center p-10">
            <button
              type="button"
              class="btn btn-outline-primary bg-gradient-r green-100 text-white text-bold"
            >
              <Link to="/proyectosEstudiante/index">Atras </Link>
            </button>

            <br />
            <br />

            <div className=" bg-gray-100 text-bold text-center display-1 h1 pt-15">
              <h1>Avances </h1>
            </div>

            <br />
            <br />

            <table class="table table-success table-striped table-hover align-middle table-bordered ">
              <thead className="tabla">
                <tr>
                  <th scope="col" className="text-center">
                    ID Avance
                  </th>
                  <th scope="col" className="text-center">
                    Fecha
                  </th>
                  <th scope="col" className="text-center">
                    Descripción
                  </th>
                  <th scope="col" className="text-center">
                    Observaciones
                  </th>
                  <th scope="col" className="text-center">
                    nombre
                  </th>
                  <th scope="col" className="text-center">
                    Apellido
                  </th>
                  <th scope="col" className="text-center">
                    Opciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {queryData &&
                  queryData.filtrarAvance.map((u) => {
                    return (
                      <tr key={u._id}>
                        <th scope="row" className="text-center">
                          {u._id.slice(20)}
                        </th>
                        <td class="text-center">{u.fecha.slice(0, 10)}</td>
                        <td class="text-center">{u.descripcion}</td>
                        <td class="text-center">{u.observaciones}</td>
                        <td class="text-center">{u.creadoPor.nombre}</td>
                        <td class="text-center">{u.creadoPor.apellido}</td>
                        <td
                          class="d-flex justify-content-around align-items-center"
                          style={{ color: "#1588B4", height: "65px" }}
                        >
                          <Link
                            to={`/proyectosEstudiante/editarAvance/${u._id}`}
                          >
                            <button> Editar Avance </button>
                            <i className="fas fa-pencil-alt input-group justify-content-around "></i>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </PrivateRoute>
      </div>
    </div>
  );
};

export default AvancesEstudiante;
