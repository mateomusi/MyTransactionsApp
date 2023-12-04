import React, { useState } from "react";
import Transaction from "./Transaction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const Folder = ({
  carpetas,
  carpeta,
  agregarTransaccion,
  eliminarTransaccion,
  eliminarCarpeta,
  agregarCarpeta,
}) => {
  const [mostrarCampoNombre, setMostrarCampoNombre] = useState(false);
  const [nuevoNombreCarpeta, setNuevoNombreCarpeta] = useState("");
  const [nuevaTransaccion, setNuevaTransaccion] = useState({
    fecha: new Date(),
    monto: "",
    descripcion: "",
    tipo: "",
  });

  if (!carpeta || !carpeta.nombre) {
    return <div></div>;
  }

  const handleTipoTransaccion = (tipo) => {
    setNuevaTransaccion({ ...nuevaTransaccion, tipo });
  };

  const handleMostrarCampoNombre = () => {
    setMostrarCampoNombre(true);
  };

  const handleAgregarCarpeta = () => {
    if (nuevoNombreCarpeta.trim() !== "") {
      agregarCarpeta(nuevoNombreCarpeta);
      setNuevoNombreCarpeta("");
      setMostrarCampoNombre(false); // Oculta el campo después de agregar la carpeta
    }
  };

  const handleEliminarCarpeta = () => {
    eliminarCarpeta(carpeta.id); // Llama a la función eliminarCarpeta pasando el ID de la carpeta
  };

  const handleAgregarTransaccion = () => {
    // Validación para asegurarse de que la nueva transacción tenga al menos una fecha y un monto antes de agregarla
    if (nuevaTransaccion.fecha && nuevaTransaccion.monto) {
      agregarTransaccion(carpeta.id, nuevaTransaccion);
      // Limpiar el formulario después de agregar la transacción
      setNuevaTransaccion({
        fecha: new Date(),
        monto: "",
        descripcion: "",
      });
    } else {
      // Manejo de error si la transacción está incompleta
      alert(
        "Por favor, ingresa una fecha y un monto para agregar una transacción."
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaTransaccion((prevTransaccion) => ({
      ...prevTransaccion,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setNuevaTransaccion((prevTransaccion) => ({
      ...prevTransaccion,
      fecha: date,
    }));
  };

  return (
    <div className="folder" style={{ backgroundColor: carpeta.color }}>
      <div className="encabezado">
        <span className="nombrecarpeta">{carpeta.nombre}</span>

        {!mostrarCampoNombre && carpetas && carpetas.length > 0 && (
          <button onClick={handleMostrarCampoNombre}>Agregar Carpeta</button>
        )}
        <button className="eliminar" onClick={handleEliminarCarpeta}>
          <svg viewBox="0 0 448 512" className="svgIcon">
            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
          </svg>
        </button>
      </div>
      <div className="formulario">
        {/* Formulario para agregar una nueva transacción */}
        <input
          type="date"
          name="date"
          placeholder="Fecha"
          value={nuevaTransaccion.fecha}
          onChange={(e) =>
            setNuevaTransaccion({ ...nuevaTransaccion, fecha: e.target.value })
          }
        />
        <input
          className="monto"
          type="number"
          name="monto"
          placeholder="Monto"
          value={nuevaTransaccion.monto}
          onChange={(e) =>
            setNuevaTransaccion({ ...nuevaTransaccion, monto: e.target.value })
          }
        />
        <input
          type="text"
          name="descripcion"
          placeholder="Descripción"
          value={nuevaTransaccion.descripcion}
          onChange={(e) =>
            setNuevaTransaccion({
              ...nuevaTransaccion,
              descripcion: e.target.value,
            })
          }
        />
        <div className="btn-pc">
          <button
            className="pago"
            style={{ backgroundColor: "#ff0400" }}
            onClick={() => handleTipoTransaccion("Pago")}
          >
            Pago
          </button>
          <button
            className="cobro"
            style={{ backgroundColor: "#28ed1d" }}
            onClick={() => handleTipoTransaccion("Cobro")}
          >
            Cobro
          </button>
        </div>
      </div>
      <button className="agregar" onClick={handleAgregarTransaccion}>
        Agregar Transacción
      </button>

      {/* Mostrar las transacciones existentes */}
      {carpeta.transacciones.map((transaccion) => (
        <Transaction
          key={transaccion.id}
          transaccion={transaccion}
          eliminarTransaccion={eliminarTransaccion}
          style={{
            backgroundColor:
              transaccion.tipo === "Pago" ? "#ff0400" : "#28ed1d",
          }}
        />
      ))}
    </div>
  );
};

export default Folder;
