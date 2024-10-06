import { useForm } from "react-hook-form";
import InputTextBaseComponent from "../../../components/InputTextBaseComponent/InputTextBaseComponent";
import { PropertiesForm } from "../models/properties.model";
import SwitchComponent from "../../../components/SwitchComponent/SwitchComponent";
import { Button } from "primereact/button";
import MultiSelectComponent from "../../../components/MultiselectComponent/MultiselectComponent";

function FormProperties() {
  const defaultValues: PropertiesForm = {
    document: "",
    name: "",
    phone: "",
    address: "",
    email: "",
    percentageCommission: "",
    fourPerThousand: false,
    fourPerThousandValue: 0,
    accountNumber: "",
    accountType: "",
    bank: "",
    property: [],
    administrationPayment: "",
  };
  const {
    reset,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<PropertiesForm>({ defaultValues, mode: "onChange" });

  const onSubmit = (data: PropertiesForm) => {
    console.log(data);
  };

  const dataBase = [
    {
      name: "owner",
      code: "owner",
    },
    {
      name: "property",
      code: "property",
    },
  ];
  return (
    <form
      className="formgroup-inline justify-content-center align-items-center mb-2 mt-4 grid"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="col-3 md:col-3 sm:col-12">
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent="Documento:"
          nameInputTextBaseComponent="document"
          requiredInputTextBaseComponent="Documento requerido"
          autoFocus
        />
      </div>
      <div className="col-3 md:col-3 sm:col-12">
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent="Nombre:"
          nameInputTextBaseComponent="name"
          requiredInputTextBaseComponent="Nombre requerido"
        />
      </div>
      <div className="col-3 md:col-3 sm:col-12">
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent="Teléfono:"
          nameInputTextBaseComponent="phone"
          requiredInputTextBaseComponent="Telefóno requerido"
        />
      </div>
      <div className="col-3 md:col-3 sm:col-12">
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent="Dirección:"
          nameInputTextBaseComponent="address"
          requiredInputTextBaseComponent="Dirección requerida"
        />
      </div>
      <div className="col-3 md:col-3 sm:col-12">
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent="Correo:"
          nameInputTextBaseComponent="email"
          requiredInputTextBaseComponent="Correo requerido"
        />
      </div>
      <div className="col-3 md:col-3 sm:col-12">
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent="Porcentaje de comisión %:"
          nameInputTextBaseComponent="percentageCommission"
          requiredInputTextBaseComponent="Porcentaje de comisión % requerido"
        />
      </div>
      <div className="col-3 md:col-3 sm:col-12">
        <MultiSelectComponent
          control={control}
          data={dataBase}
          errors={errors}
          labelMultiSelect="Inmuebles:"
          nameMultiSelect="property"
          requiredMultiSelect="Este campo es requerido"
          placeholderMultiSelect="Seleccione inmuebles"
        />
      </div>
      <div className="col-3 md:col-3 sm:col-12">
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent="Banco:"
          nameInputTextBaseComponent="bank"
          requiredInputTextBaseComponent="Banco requerido"
        />
      </div>
      <div className="col-3 md:col-3 sm:col-12">
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent="Tipo de cuenta:"
          nameInputTextBaseComponent="accountType"
          requiredInputTextBaseComponent="Tipo de cuenta requerido"
        />
      </div>
      <div className="col-3 md:col-3 sm:col-12">
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent="Número de cuenta:"
          nameInputTextBaseComponent="accountNumber"
          requiredInputTextBaseComponent="Numero de cuenta requerido"
        />
      </div>

      <div className="col-3 md:col-3 sm:col-12">
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent="Porcentaje de comisión %:"
          nameInputTextBaseComponent="percentageCommission"
          requiredInputTextBaseComponent="Porcentaje de comisión % requerido"
        />
      </div>

      <div className="col-3 md:col-3 sm:col-12">
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent="Valor cuatro por mil:"
          nameInputTextBaseComponent="fourPerThousandValue"
          requiredInputTextBaseComponent="Valor cuatro por mil requerido"
        />
      </div>
      <div className="col-3 md:col-3 sm:col-12">
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent="Pago administración:"
          nameInputTextBaseComponent="administrationPayment"
          requiredInputTextBaseComponent="Valor cuatro por mil requerido"
        />
      </div>
      <div className="col-3 md:col-3 sm:col-12">
        <SwitchComponent
          control={control}
          errors={errors}
          label="Cuatro por mil"
          name="fourPerThousand"
        />
      </div>

      <div className="flex align-content-center flex-wrap col-2">
        <Button label="Guardar" />
      </div>
    </form>
  );
}

export default FormProperties;
