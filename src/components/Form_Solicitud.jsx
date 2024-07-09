import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { RadioButton } from "primereact/radiobutton";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

const sucursalOptions = [
  { key: "principal", label: "Principal", value: "PRINCIPAL" },
  { key: "secundaria", label: "Secundaria", value: "SECUNDARIA" },
];

const tiposMedicamento = [
  { label: "Analgésico", value: "analgésico" },
  { label: "Analéptico", value: "analéptico" },
  { label: "Anestésico", value: "anestésico" },
  { label: "Antiácido", value: "antiácido" },
  { label: "Antidepresivo", value: "antidepresivo" },
  { label: "Antibiótico", value: "antibiótico" },
];

const initialState = {
  nombreMedicamento: "",
  tipoMedicamento: "",
  cantidad: 0,
  distribuidor: "",
  sucursales: [],
};

export const Form_Solicitud = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    control,
    reset,
  } = useForm({ defaultValues: initialState });
  const [visibleResumen, setVisibleResumen] = useState(false);

  const onSubmitForm = (data) => {
    console.log(data);
    if (data.sucursales.length > 0) {
      setVisibleResumen(true);
    } else {
      alert("Por favor, complete todos los campos correctamente.");
    }
  };

  const handleConfirmarPedido = () => {
    onSubmit(getValues());
    setVisibleResumen(false);
    showConfirmation(
      "Pedido Enviado",
      "El pedido ha sido enviado correctamente."
    );
    reset();
  };

  const handleCancelarPedido = () => {
    setVisibleResumen(false);
  };

  const getDireccionSucursal = (sucursal) => {
    switch (sucursal) {
      case "PRINCIPAL":
        return "Calle 12 de Diciembre.";
      case "SECUNDARIA":
        return "Calle Av. Quito";
      default:
        return "";
    }
  };

  const showConfirmation = (summary, detail) => {
    window.alert(`${summary}\n\n${detail}`);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitForm)} className="p-fluid">
        <div className="p-field">
          <label htmlFor="nombreMedicamento">Nombre del Medicamento:</label>
          <InputText
            id="nombreMedicamento"
            {...register("nombreMedicamento", {
              required: "Este campo es requerido",
              minLength: {
                value: 3,
                message: "Debe tener al menos 3 caracteres",
              },
              maxLength: {
                value: 100,
                message: "No puede tener más de 100 caracteres",
              },
              pattern: {
                value: /^[a-zA-Z0-9]+$/,
                message: "Solo se permiten números y letras"
              }
            })}
          />
          {errors.nombreMedicamento && (
            <p style={{ color: "red" }}>{errors.nombreMedicamento.message}</p>
          )}
        </div>
        <div className="p-field">
          <Controller
            name="tipoMedicamento"
            control={control}
            rules={{ required: "Este campo es requerido" }}
            render={({ field }) => (
              <>
                <label htmlFor={field.name}>Tipo del Medicamento:</label>
                <Dropdown
                  id={field.name}
                  ref={field.ref}
                  value={field.value}
                  options={tiposMedicamento}
                  onBlur={field.onBlur}
                  onChange={(e) => field.onChange(e.value)}
                />
              </>
            )}
          />
          {errors.tipoMedicamento && (
            <p style={{ color: "red" }}>{errors.tipoMedicamento.message}</p>
          )}
        </div>
        <div className="p-field">
          <Controller
            name="cantidad"
            control={control}
            rules={{
              required: "Este campo es requerido",
              min: { value: 1, message: "Cantidad debe ser mayor que 0" },
            }}
            render={({ field }) => (
              <>
                <label htmlFor={field.name}>Cantidad: </label>
                <InputNumber
                  id={field.name}
                  ref={field.ref}
                  value={field.value}
                  onBlur={field.onBlur}
                  onValueChange={(e) => field.onChange(e)}
                />
              </>
            )}
          />
          {errors.cantidad && (
            <p style={{ color: "red" }}>{errors.cantidad.message}</p>
          )}
        </div>
        <div className="p-field">
          <label>Distribuidor:</label>
          <div className="p-formgroup-inline">
            <Controller
              name="distribuidor"
              control={control}
              rules={{ required: "Este campo es requerido" }}
              render={({ field }) => (
                <>
                  <div className="p-field-radiobutton">
                    <RadioButton
                      inputId="cofarma"
                      value="COFARMA"
                      onChange={(e) => field.onChange(e.value)}
                      checked={field.value === "COFARMA"}
                    />
                    <label htmlFor="cofarma">COFARMA</label>
                  </div>
                  <div className="p-field-radiobutton">
                    <RadioButton
                      inputId="empsephar"
                      value="EMPSEPHAR"
                      onChange={(e) => field.onChange(e.value)}
                      checked={field.value === "EMPSEPHAR"}
                    />
                    <label htmlFor="empsephar">EMPSEPHAR</label>
                  </div>
                  <div className="p-field-radiobutton">
                    <RadioButton
                      inputId="cemefar"
                      value="CEMEFAR"
                      onChange={(e) => field.onChange(e.value)}
                      checked={field.value === "CEMEFAR"}
                    />
                    <label htmlFor="cemefar">CEMEFAR</label>
                  </div>
                </>
              )}
            />
          </div>
          {errors.distribuidor && (
            <p style={{ color: "red" }}>{errors.distribuidor.message}</p>
          )}
        </div>
        <div className="p-field">
          <label>Sucursal:</label>
          <div className="p-formgroup-inline">
            <Controller
              name="sucursales"
              control={control}
              rules={{
                validate: (value) =>
                  (value && value.length > 0) ||
                  "Seleccione al menos una sucursal",
              }}
              render={({ field }) => (
                <>
                  {sucursalOptions.map((sucursal) => (
                    <div key={sucursal.key} className="p-field-checkbox">
                      <Checkbox
                        inputId={sucursal.key}
                        value={sucursal.value}
                        onChange={(e) => {
                          const selected = field.value || [];
                          const checked = e.checked
                            ? [...selected, e.value]
                            : selected.filter((val) => val !== e.value);
                          field.onChange(checked);
                        }}
                        checked={field.value?.includes(sucursal.value)}
                      />
                      <label htmlFor={sucursal.key}>{sucursal.label}</label>
                    </div>
                  ))}
                </>
              )}
            />
          </div>
          {errors.sucursales && (
            <p style={{ color: "red" }}>Seleccione al menos una sucursal</p>
          )}
        </div>
        <Button type="submit" label="OK" className="p-mr-2" />
        <Button
          type="button"
          label="Borrar"
          className="p-button-secondary"
          onClick={() => reset()}
        />
      </form>

      <Dialog
        header={`Confirmación de Pedido`}
        visible={visibleResumen}
        style={{ width: "30vw" }}
        onHide={() => setVisibleResumen(false)}
        footer={
          <div>
            <Button
              label="Cancelar"
              icon="pi pi-times"
              onClick={handleCancelarPedido}
              className="p-button-text"
            />
            <Button
              label="Confirmar"
              icon="pi pi-check"
              onClick={handleConfirmarPedido}
              autoFocus
            />
          </div>
        }
      >
        <div>
          <h3>Pedido al Distribuidor {getValues("distribuidor")}</h3>
          <p>
            {getValues("cantidad")} unidades del {getValues("tipoMedicamento")}{" "}
            {getValues("nombreMedicamento")}
          </p>
          <p>
            Para la farmacia situada en{" "}
            {getValues("sucursales")
              ?.map((sucursal) => getDireccionSucursal(sucursal))
              .join(" y en ")}
          </p>
        </div>
      </Dialog>
    </>
  );
};
