import { useForm } from "react-hook-form";
import { TenantForm } from "../models/tenant.model";
import InputTextBaseComponent from "../../../components/InputTextBaseComponent/InputTextBaseComponent";
import DropdownComponent from "../../../components/DropdownComponent/DropdownComponent";
import MultiSelectComponent from "../../../components/MultiselectComponent/MultiselectComponent";
import { Button } from "primereact/button";

function FormTenant(): JSX.Element {
  const defaultValues: TenantForm = {
    property: "",
    canon: "",
    document: "",
    name: "",
    contractNumber: "",
    policyNumber: "",
    phone: "",
    email: "",
    coDebtors: [],
  };
  const {
    reset,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<TenantForm>({ defaultValues, mode: "onChange" });
  const onSubmit = (data: TenantForm) => {};
  const dataBaseDropdown = [
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
      className="formgroup-inline justify-content-center sm-coopsana align-items-center mb-2 mt-4 grid"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="col-8 md:col-3 sm:col-12">
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent="Cedula:"
          nameInputTextBaseComponent="document"
          requiredInputTextBaseComponent="El campo cedula es requerido"
          autoFocus
        />
      </div>
      <div className="col-8 md:col-3 sm:col-12">
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent="Nombre:"
          nameInputTextBaseComponent="name"
          requiredInputTextBaseComponent="El campo nombre es requerido"
        />
      </div>

      <div className="col-8 md:col-3 sm:col-12">
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent="Canon:"
          nameInputTextBaseComponent="canon"
          requiredInputTextBaseComponent="El campo canon es requerido"
        />
      </div>

      <div className="col-8 md:col-3 sm:col-12">
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent="Poliza:"
          nameInputTextBaseComponent="policyNumber"
          requiredInputTextBaseComponent="El campo poliza es requerido"
        />
      </div>
      <div className="col-8 md:col-3 sm:col-12">
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent="Teléfono:"
          nameInputTextBaseComponent="phone"
          requiredInputTextBaseComponent="El campo telefono es requerido"
        />
      </div>
      <div className="col-8 md:col-3 sm:col-12">
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent="Correo:"
          nameInputTextBaseComponent="email"
          requiredInputTextBaseComponent="El campo correo es requerido"
        />
      </div>
      <div className="col-8 md:col-3 sm:col-12">
        <MultiSelectComponent
          control={control}
          data={dataBaseDropdown}
          errors={errors}
          labelMultiSelect="Codeudores:"
          nameMultiSelect="coDebtors"
          filterMultiSelect
          requiredMultiSelect="El campo codeudor es requerido"
          placeholderMultiSelect="Seleccione un codeudor"
        />
      </div>
      <div className="col-8 md:col-3 sm:col-12">
        <DropdownComponent
          control={control}
          data={dataBaseDropdown}
          errors={errors}
          label="Inmueble:"
          nameDropdown="property"
          requiredDropdown="El campo propietario es requerido"
          filterDropdown
          placeholderDropdown="Seleccione un inmueble"
        />
      </div>
      <div className="col-8 md:col-3 sm:col-12">
        <DropdownComponent
          control={control}
          data={dataBaseDropdown}
          errors={errors}
          label="Contrato:"
          nameDropdown="contractNumber"
          emptyFilterMessage="No hay resultados"
          placeholderDropdown="Seleccione un contrato"
        />
      </div>
      <div className="flex align-content-center flex-wrap col-3">
        <Button label="Guardar" className="" />
      </div>
    </form>
  );
}

export default FormTenant;
