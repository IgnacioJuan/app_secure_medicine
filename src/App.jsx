import "./App.css";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import React, { useState } from "react";
import { Form_Solicitud } from "./components/Form_Solicitud";

function App() {
  const [visible, setVisible] = useState(false);

  const handleFormSubmit = (data) => {
    console.log('Pedido:', data);
    // Aquí puedes manejar los datos del formulario
  };

  return (
    <>
      <div className="card flex justify-content-center">
        <Button
          label="Cargar Pedido"
          icon="pi pi-external-link"
          onClick={() => setVisible(true)}
        />

        <Dialog
          header="Formulario de Solicitud"
          visible={visible}
          style={{ width: "50vw" }}
          onHide={() => setVisible(false)}
        >
          <Form_Solicitud onSubmit={handleFormSubmit} />
        </Dialog>
      </div>
    </>
  );
}

export default App;
