import { useForm } from "react-hook-form";
import { ContractForm } from "../models/adminContract.model";
import DropdownComponent from "../../../components/DropdownComponent/DropdownComponent";
import InputTextBaseComponent from "../../../components/InputTextBaseComponent/InputTextBaseComponent";
import InputDateComponent from "../../../components/InputDateComponent/InputDateComponent";
import { Button } from "primereact/button";

function FormContract(): JSX.Element {
  const defaultValues: ContractForm = {
    dateStart: null,
    dateEnd: null,
    dateNotification: null,
    increment: "",
    numberContract: "",
    nameTenant: "",
    namePropertie: "",
  };

  const {
    reset,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ContractForm>({ defaultValues, mode: "onChange" });

  const onSubmit = (data: ContractForm) => {
    console.log(data);
  };

  const baseData = [
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
      <div className="col-8 md:col-3 sm:col-12">
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent="Incremento:"
          nameInputTextBaseComponent="increment"
          requiredInputTextBaseComponent="Incremento requerido"
        />
      </div>
      <div className="col-8 md:col-3 sm:col-12">
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent="Número de Contrato:"
          nameInputTextBaseComponent="numberContract"
          requiredInputTextBaseComponent="Número de contrato requerido"
        />
      </div>
      <div className="col-8 md:col-3 sm:col-12">
        <DropdownComponent
          control={control}
          data={baseData}
          errors={errors}
          label="Inquilino:"
          nameDropdown="nameTenant"
          emptyFilterMessage="No existen inquilinos"
          requiredDropdown="Inquilino requerido"
        />
      </div>
      <div className="col-8 md:col-3 sm:col-12">
        <DropdownComponent
          control={control}
          data={baseData}
          errors={errors}
          label="Propietario:"
          nameDropdown="namePropertie"
          emptyFilterMessage="No existen propietarios"
          requiredDropdown="Propietario requerido"
        />
      </div>
      <div className="col-8 md:col-3 sm:col-12">
        <InputDateComponent
          control={control}
          errors={errors}
          labelDateName="Fecha de inicio:"
          nameDate="dateStart"
          dateFormatValue="dd/mm/yy"
          dateMessageRequired="Fecha de inicio requerida"
          showIconInputDate
        />
      </div>
      <div className="col-8 md:col-3 sm:col-12">
        <InputDateComponent
          control={control}
          errors={errors}
          labelDateName="Fecha de fin:"
          nameDate="dateEnd"
          dateFormatValue="dd/mm/yy"
          dateMessageRequired="Fecha de finalización requerida"
          showIconInputDate
        />
      </div>
      <div className="col-8 md:col-3 sm:col-12">
        <InputDateComponent
          control={control}
          errors={errors}
          labelDateName="Fecha de notificación	:"
          nameDate="dateNotification"
          dateFormatValue="dd/mm/yy"
          dateMessageRequired="Fecha de notificación requerida"
          showIconInputDate
        />
      </div>
      <div className="col-8 md:col-3 sm:col-12">
        <Button label="Guardar" icon="pi pi-save" type="submit" />
      </div>
    </form>
  );
}

export default FormContract;
