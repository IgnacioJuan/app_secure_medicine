import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { RadioButton } from 'primereact/radiobutton';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

export const Form_Solicitud = ({ onSubmit }) => {
  const [nombreMedicamento, setNombreMedicamento] = useState('');
  const [tipoMedicamento, setTipoMedicamento] = useState('');
  const [cantidad, setCantidad] = useState(null);
  const [distribuidor, setDistribuidor] = useState('');
  const [sucursales, setSucursales] = useState([]);
  const [visibleResumen, setVisibleResumen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const tiposMedicamento = [
    { label: 'Analgésico', value: 'analgésico' },
    { label: 'Analéptico', value: 'analéptico' },
    { label: 'Anestésico', value: 'anestésico' },
    { label: 'Antiácido', value: 'antiácido' },
    { label: 'Antidepresivo', value: 'antidepresivo' },
    { label: 'Antibiótico', value: 'antibiótico' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombreMedicamento && tipoMedicamento && cantidad > 0 && distribuidor && sucursales.length > 0) {
      setVisibleResumen(true);
    } else {
      setErrorMessage('Por favor, complete todos los campos correctamente.');
    }
  };

  const handleConfirmarPedido = () => {
    onSubmit({ nombreMedicamento, tipoMedicamento, cantidad, distribuidor, sucursales });
    setVisibleResumen(false);
    showConfirmation('Pedido Enviado', 'El pedido ha sido enviado correctamente.');
  };

  const handleCancelarPedido = () => {
    setVisibleResumen(false);
  };

  const handleSucursalChange = (e) => {
    const { value, checked } = e.target;
    setSucursales((prev) =>
      checked ? [...prev, value] : prev.filter((sucursal) => sucursal !== value)
    );
  };

  const getDireccionSucursal = (sucursal) => {
    switch (sucursal) {
      case 'PRINCIPAL':
        return 'Calle 12 de Diciembre.';
      case 'SECUNDARIA':
        return 'Calle Av. Quito';
      default:
        return '';
    }
  };

  const showConfirmation = (summary, detail) => {
    window.alert(`${summary}\n\n${detail}`);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="p-fluid">
        <div className="p-field">
          <label htmlFor="nombreMedicamento">Nombre del Medicamento:</label>
          <InputText
            id="nombreMedicamento"
            value={nombreMedicamento}
            onChange={(e) => setNombreMedicamento(e.target.value)}
          />
        </div>
        <div className="p-field">
          <label htmlFor="tipoMedicamento">Tipo del Medicamento:</label>
          <Dropdown
            id="tipoMedicamento"
            value={tipoMedicamento}
            options={tiposMedicamento}
            onChange={(e) => setTipoMedicamento(e.value)}
          />
        </div>
        <div className="p-field">
          <label htmlFor="cantidad">Cantidad:</label>
          <InputNumber
            id="cantidad"
            value={cantidad}
            onValueChange={(e) => setCantidad(e.value)}
          />
        </div>
        <div className="p-field">
          <label>Distribuidor:</label>
          <div className="p-formgroup-inline">
            <div className="p-field-radiobutton">
              <RadioButton
                inputId="cofarma"
                name="distribuidor"
                value="COFARMA"
                onChange={(e) => setDistribuidor(e.value)}
                checked={distribuidor === 'COFARMA'}
              />
              <label htmlFor="cofarma">COFARMA</label>
            </div>
            <div className="p-field-radiobutton">
              <RadioButton
                inputId="empsephar"
                name="distribuidor"
                value="EMPSEPHAR"
                onChange={(e) => setDistribuidor(e.value)}
                checked={distribuidor === 'EMPSEPHAR'}
              />
              <label htmlFor="empsephar">EMPSEPHAR</label>
            </div>
            <div className="p-field-radiobutton">
              <RadioButton
                inputId="cemefar"
                name="distribuidor"
                value="CEMEFAR"
                onChange={(e) => setDistribuidor(e.value)}
                checked={distribuidor === 'CEMEFAR'}
              />
              <label htmlFor="cemefar">CEMEFAR</label>
            </div>
          </div>
        </div>
        <div className="p-field">
          <label>Sucursal:</label>
          <div className="p-formgroup-inline">
            <div className="p-field-checkbox">
              <Checkbox
                inputId="principal"
                name="sucursal"
                value="PRINCIPAL"
                onChange={handleSucursalChange}
                checked={sucursales.includes('PRINCIPAL')}
              />
              <label htmlFor="principal">Principal</label>
            </div>
            <div className="p-field-checkbox">
              <Checkbox
                inputId="secundaria"
                name="sucursal"
                value="SECUNDARIA"
                onChange={handleSucursalChange}
                checked={sucursales.includes('SECUNDARIA')}
              />
              <label htmlFor="secundaria">Secundaria</label>
            </div>
          </div>
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <Button type="submit" label="OK" className="p-mr-2" />
        <Button type="button" label="Borrar" className="p-button-secondary" onClick={() => {
          setNombreMedicamento('');
          setTipoMedicamento('');
          setCantidad(null);
          setDistribuidor('');
          setSucursales([]);
          setErrorMessage('');
        }} />
      </form>

      <Dialog
        header={`Confirmación de Pedido`}
        visible={visibleResumen}
        style={{ width: '30vw' }}
        onHide={() => setVisibleResumen(false)}
        footer={
          <div>
            <Button label="Cancelar" icon="pi pi-times" onClick={handleCancelarPedido} className="p-button-text" />
            <Button label="Confirmar" icon="pi pi-check" onClick={handleConfirmarPedido} autoFocus />
          </div>
        }
      >
        <div>
          <h3>Pedido al Distribuidor {distribuidor}</h3>
          <p>{cantidad} unidades del {tipoMedicamento} {nombreMedicamento}</p>
          <p>Para la farmacia situada en {sucursales.map(sucursal => getDireccionSucursal(sucursal)).join(' y en ')}</p>
        </div>
      </Dialog>
    </>
  );
};
