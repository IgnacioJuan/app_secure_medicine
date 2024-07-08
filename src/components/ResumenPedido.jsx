import React from 'react';
import { Button } from 'primereact/button';

const ResumenPedido = ({ pedido, onCancel, onSend }) => {
  return (
    <div>
      <h1>Pedido al Distribuidor {pedido.distribuidor}</h1>
      <p>{pedido.cantidad} unidades del {pedido.tipoMedicamento} {pedido.nombreMedicamento}</p>
      <p>
        Para la farmacia situada en {pedido.sucursales.join(' y en ')}
      </p>
      <Button label="Cancelar" className="p-button-secondary p-mr-2" onClick={onCancel} />
      <Button label="Enviar Pedido" onClick={onSend} />
    </div>
  );
};

export default ResumenPedido;
