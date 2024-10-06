import { useForm } from "react-hook-form";
import { PropertyForm } from "../models/adminProperty.model";
import InputTextBaseComponent from "../../../components/InputTextBaseComponent/InputTextBaseComponent";
import DropdownComponent from "../../../components/DropdownComponent/DropdownComponent";
import { Button } from "primereact/button";

function FormProperty(): JSX.Element {
  const defaultValues: PropertyForm = {
    nameProperty: "",
    address: "",
    owner: "",
    tenant: "",
  };
  const {
    reset,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<PropertyForm>({ defaultValues, mode: "onChange" });

  const onSubmit = (data: PropertyForm) => {
    console.log(data);
  };
  const dataBaseDropdown = [
    {
      name: "owner",
      code: "owner",
    },
    {
      name: "owner",
      code: "owner",
    },
  ];
  return (
    <form
      className="
    formgroup-inline justify-content-center align-items-center mb-2 mt-4 grid"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="col-3 md:col-3 sm:col-12">
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent="Nombre de la propiedad:"
          nameInputTextBaseComponent="nameProperty"
          requiredInputTextBaseComponent="La dirección es requerida"
          autoFocus
        />
      </div>
      <div className="col-3 md:col-3 sm:col-12">
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent="Dirección:"
          nameInputTextBaseComponent="address"
          requiredInputTextBaseComponent="La dirección es requerida"
        />
      </div>
      <div className="col-3 md:col-3 sm:col-12">
        <DropdownComponent
          control={control}
          data={dataBaseDropdown}
          errors={errors}
          label="Propietario:"
          nameDropdown="owner"
          emptyFilterMessage="No hay propietarios"
          filterDropdown
          requiredDropdown="El propietario es requerido"
        />
      </div>
      <div className="col-3 md:col-3 sm:col-12">
        <DropdownComponent
          control={control}
          data={dataBaseDropdown}
          errors={errors}
          label="Inquilino:"
          nameDropdown="tenant"
          emptyFilterMessage="No hay propietarios"
          filterDropdown
          requiredDropdown="El inquilino es requerido"
        />
      </div>
      <div className="flex align-content-center flex-wrap col-2">
        <Button label="Guardar" />
      </div>
    </form>
  );
}

export default FormProperty;
