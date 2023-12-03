import React, { useEffect, useState } from "react";
import Folder from "./components/Folder";
import Transaction from "./components/Transaction";

const App = () => {
  const [state, setState] = useState({ carpetas: [] });
  const [nombreCarpeta, setNombreCarpeta] = useState("");
  const [mostrarInput, setMostrarInput] = useState(false);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("transactionsData"));
    if (storedData && storedData.carpetas) {
      setState({ carpetas: storedData.carpetas });
    }
  }, []);

  const colores = [
    "#F4CCCC",
    "#FCE5CD",
    "#FFF2CC",
    "#D9EAD3",
    "#D0E0E3",
    "#C9DAF8",
    "#CFE2F3",
    "#D9D2E9",
    "#EAD1DC",
    "#E6B8AF",
    "#F9CB9C",
    "#FFE599",
    "#B6D7A8",
    "#A2C4C9",
    "#A4C2F4",
    "#B4A7D6",
    "#D5A6BD",
    "#D291BC",
    "#E6A8A8",
    "#F4CCCC",
    "#C6D9F0",
    "#DD7E6B",
    "#9CC2CB",
    "#6FA8DC",
    "#6D9EEB",
  ];

  // Función para obtener un color aleatorio del array
  const obtenerColorAleatorio = () => {
    const indice = Math.floor(Math.random() * colores.length);
    return colores[indice];
  };

  const handleChangeNombre = (event) => {
    setNombreCarpeta(event.target.value);
  };

  const agregarCarpeta = () => {
    setMostrarInput(true);
  };

  const handleAgregarCarpeta = () => {
    const nuevaCarpeta = {
      id: Math.random(),
      nombre: nombreCarpeta,
      subcarpetas: [],
      transacciones: [],
      color: obtenerColorAleatorio(),
    };

    const updateCarpetas = [...state.carpetas, nuevaCarpeta];

    setState({ carpetas: updateCarpetas });

    localStorage.setItem(
      "transactionsData",
      JSON.stringify({ carpetas: updateCarpetas })
    );

    setNombreCarpeta("");
    setMostrarInput(false);
  };

  const eliminarCarpeta = (carpetaId) => {
    const confirmarBorrado = window.confirm(
      "¿Estás seguro de eliminar esta carpeta?"
    );
    if (confirmarBorrado) {
      const nuevasCarpetas = state.carpetas.filter(
        (carpeta) => carpeta.id !== carpetaId
      );
      setState({ carpetas: nuevasCarpetas });
      localStorage.setItem(
        "transactionsData",
        JSON.stringify({ carpetas: nuevasCarpetas })
      );
    }
  };

  const eliminarTransaccion = (transaccionId) => {
    const confirmarBorrado = window.confirm(
      "¿Estás seguro de eliminar esta transacción?"
    );

    if (confirmarBorrado) {
      const nuevasCarpetas = state.carpetas.map((carpeta) => ({
        ...carpeta,
        transacciones: carpeta.transacciones.filter(
          (transaccion) => transaccion.id !== transaccionId
        ),
      }));

      setState((prevState) => ({
        ...prevState,
        carpetas: nuevasCarpetas,
      }));

      // Actualizamos el almacenamiento local después de eliminar la transacción
      localStorage.setItem(
        "transactionsData",
        JSON.stringify({ carpetas: nuevasCarpetas })
      );
    }
  };

  const agregarTransaccion = (carpetaId, transaccion) => {
    const nuevaTransaccion = {
      id: Math.random(),
      ...transaccion,
      tipo: "pago",
    };

    const nuevasCarpetas = state.carpetas.map((carpeta) => {
      if (carpeta.id === carpetaId) {
        const updatedTransacciones = [
          ...carpeta.transacciones,
          nuevaTransaccion,
        ];
        return {
          ...carpeta,
          transacciones: updatedTransacciones,
        };
      }
      return carpeta;
    });

    setState((prevState) => ({
      ...prevState,
      carpetas: nuevasCarpetas,
    }));

    // Actualizar el almacenamiento local con todas las carpetas
    localStorage.setItem(
      "transactionsData",
      JSON.stringify({ carpetas: nuevasCarpetas })
    );
  };

  const cambiarTipoTransaccion = (carpetaId, transaccionId) => {
    setState((prevState) => {
      const nuevasCarpetas = prevState.carpetas.map((carpeta) => ({
        ...carpeta,
        transacciones: carpeta.transacciones.map((transaccion) => {
          if (transaccion.id === transaccionId) {
            return {
              ...transaccion,
              tipo: transaccion.tipo === "pago" ? "ingreso" : "pago",
            };
          }
          return transaccion;
        }),
      }));
      return { ...prevState, carpetas: nuevasCarpetas };
    });
  };

  return (
    <div className="App">
      <h1>MyTransactions</h1>
      <div className="btn-agregar-carpetas">
        {mostrarInput ? (
          <div>
            <input
              type="text"
              placeholder="Nombre De La Carpeta"
              value={nombreCarpeta}
              onChange={handleChangeNombre}
            />
            <button onClick={handleAgregarCarpeta}>Guardar Carpeta</button>
          </div>
        ) : (
          <button onClick={agregarCarpeta}>Agregar Carpeta</button>
        )}
      </div>
      <div className="carpetas">
        {state.carpetas.map((carpeta) => (
          <Folder
            key={carpeta.id}
            carpeta={carpeta}
            eliminarCarpeta={eliminarCarpeta}
            agregarTransaccion={agregarTransaccion}
            eliminarTransaccion={eliminarTransaccion}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
