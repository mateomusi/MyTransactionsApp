import React from "react";

const Transaction = ({
  transaccion,
  eliminarTransaccion,
  cambiarTipoTransaccion,
}) => {
  const handleEliminarTransaccion = () => {
    eliminarTransaccion(transaccion.id);
  };

  const handleTipoTransaccion = (tipo) => {
    cambiarTipoTransaccion(transaccion.id, tipo);
  };

  return (
    <div className="transaction">
      {transaccion && (
        <>
          <p>Fecha: {transaccion.fecha ? transaccion.fecha : "Sin fecha"}</p>
          <p>
            Monto:{" "}
            {transaccion.monto !== undefined ? transaccion.monto : "Sin monto"}
          </p>
          <p>
            Descripción:{" "}
            {transaccion.descripcion
              ? transaccion.descripcion
              : "Sin descripción"}
          </p>
          <button onClick={handleEliminarTransaccion}>
            Eliminar Transacción
          </button>
        </>
      )}
    </div>
  );
};

export default Transaction;
