import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { RadioButton } from "primereact/radiobutton";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";

export const Form_Solicitud = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const cities = [
    { name: "analgesico", code: "ana" },
    { name: "antiacido", code: "ant" },
    { name: "analéptico,", code: "anal" },
    { name: "antidepresivo", code: "antid" },
    { name: "antibióticos.", code: "antib" },
  ];

  const [ingredient, setIngredient] = useState("");

  const categories = [
    { name: "PRINCIPAL", key: "A" },
    { name: "SECUNDARIA", key: "M" },
  ];
  const [selectedCategories, setSelectedCategories] = useState([categories[1]]);

  const onCategoryChange = (e) => {
    let _selectedCategories = [...selectedCategories];

    if (e.checked) _selectedCategories.push(e.value);
    else
      _selectedCategories = _selectedCategories.filter(
        (category) => category.key !== e.value.key
      );

    setSelectedCategories(_selectedCategories);
  };

  const [loading, setLoading] = useState(false);

  const load = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="p-fluid">
      <div className="p-grid p-formgrid">
        <div className="p-col-12 p-md-6">
          <FloatLabel>
            <InputText id="medicamento" />
            <label htmlFor="medicamento">Medicamento</label>
          </FloatLabel>
        </div>

        <div className="p-col-12 p-md-6">
          <Dropdown
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.value)}
            options={cities}
            optionLabel="name"
            placeholder="Tipo de Medicamento"
            className="w-full"
          />
        </div>

        <div className="p-col-12 p-md-6">
          <FloatLabel>
            <InputNumber inputId="integeronly" id="cantidad" min={0} />
            <label htmlFor="cantidad">Cantidad</label>
          </FloatLabel>
        </div>

        <div className="p-col-12 p-md-6">
          <div className="p-grid">
            <div className="p-col-12">
              <div className="p-field-radiobutton">
                <RadioButton
                  inputId="dis1"
                  name="distribuidor"
                  value="COFARMA"
                  onChange={(e) => setIngredient(e.value)}
                  checked={ingredient === "COFARMA"}
                />
                <label htmlFor="dis1" className="ml-2">
                  COFARMA
                </label>
              </div>
              <div className="p-field-radiobutton">
                <RadioButton
                  inputId="dis2"
                  name="distribuidor"
                  value="EMPSEPHAR"
                  onChange={(e) => setIngredient(e.value)}
                  checked={ingredient === "EMPSEPHAR"}
                />
                <label htmlFor="dis2" className="ml-2">
                  EMPSEPHAR
                </label>
              </div>
              <div className="p-field-radiobutton">
                <RadioButton
                  inputId="dis3"
                  name="distribuidor"
                  value="CEMEFAR."
                  onChange={(e) => setIngredient(e.value)}
                  checked={ingredient === "CEMEFAR."}
                />
                <label htmlFor="dis3" className="ml-2">
                  CEMEFAR
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="p-col-12">
          <div className="p-field-checkbox">
            {categories.map((category) => (
              <div key={category.key} className="p-mb-2">
                <Checkbox
                  inputId={category.key}
                  name="lugar"
                  value={category}
                  onChange={onCategoryChange}
                  checked={selectedCategories.some(
                    (item) => item.key === category.key
                  )}
                />
                <label htmlFor={category.key} className="ml-2">
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="p-col-12">
          <Button
            label="Submit"
            severity="success"
            loading={loading}
            onClick={load}
            className="w-full"
          />
        </div>
        <div className="p-col-12">
          <Button label="Cancel" severity="danger" className="w-full" />
        </div>
      </div>
    </div>
  );
};
