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
          <FontAwesomeIcon icon={faX} size="lg" style={{ color: "#000000" }} />
        </button>
      </div>
      <div>
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
        <button
          className="pago"
          style={{ backgroundColor: "#ff0400" }}
          onClick={() => handleTipoTransaccion("Pago")}
        >
          P
        </button>
        <button
          className="cobro"
          style={{ backgroundColor: "#28ed1d" }}
          onClick={() => handleTipoTransaccion("Cobro")}
        >
          C
        </button>
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
