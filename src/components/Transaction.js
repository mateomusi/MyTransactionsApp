import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

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
          <button className="rmBtn" onClick={handleEliminarTransaccion}>
            <FontAwesomeIcon
              icon={faMinus}
              size="lg"
              style={{ color: "#fff" }}
            />
          </button>
        </>
      )}
    </div>
  );
};

export default Transaction;
