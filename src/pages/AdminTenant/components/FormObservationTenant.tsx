import { Button } from "primereact/button";
import InputTextBaseComponent from "../../../components/InputTextBaseComponent/InputTextBaseComponent";
import { ObservationTenantForm } from "../models/tenant.model";
import { useForm } from "react-hook-form";
import InputTextAreaComponent from "../../../components/InputTextAreaComponent/InputTextAreaComponent";

interface Props {
  idTenant: number;
}
function FormObservationTenant({ idTenant }: Props): JSX.Element {
  const defaultValues: ObservationTenantForm = {
    observation: "",
  };
  const {
    reset,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ObservationTenantForm>({ defaultValues, mode: "onChange" });
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <form
      className="formgroup-inline justify-content-center sm-coopsana align-items-center mb-2 mt-4 grid"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputTextAreaComponent
        controlInputText={control}
        errorsInputText={errors}
        labelInputText="Observación:"
        nameInputText="observation"
        requiredInputText="Observación requerida"
        autoFocus
      />
      <Button label="Guardar" />
    </form>
  );
}

export default FormObservationTenant;
