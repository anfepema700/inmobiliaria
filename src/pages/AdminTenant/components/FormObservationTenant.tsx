import { Button } from "primereact/button";
import InputTextBaseComponent from "../../../components/InputTextBaseComponent/InputTextBaseComponent";
import {
  ObservationTenantForm,
  TenantObservationForm,
} from "../models/tenant.model";
import { useForm } from "react-hook-form";
import InputTextAreaComponent from "../../../components/InputTextAreaComponent/InputTextAreaComponent";
import { createObservationTenantService } from "../services/tenant.service";
import { CustomMessageProps } from "../../../components/MessageComponent/models/messageComponent.model";

interface Props {
  idTenant: number;
  setVisibleObservationForm: (visible: boolean) => void;
  getAllTenants: () => void;
  setApiResponse: (params: CustomMessageProps) => void;
}
function FormObservationTenant({
  idTenant,
  setVisibleObservationForm,
  getAllTenants,
  setApiResponse,
}: Props): JSX.Element {
  const defaultValues: ObservationTenantForm = {
    observation: "",
  };
  const {
    reset,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<TenantObservationForm>({ defaultValues, mode: "onChange" });
  const onSubmit = async (data: TenantObservationForm) => {
    try {
      const dataForCreate: TenantObservationForm = {
        idTenant: idTenant,
        observation: data.observation,
      };
      const createObservationTenant = await createObservationTenantService(
        dataForCreate
      );
      if (createObservationTenant) {
        getAllTenants();
        reset();
        setVisibleObservationForm(false);
        setApiResponse({
          severity: "success",
          message: "Observación guardada correctamente",
        });
      }
    } catch (error) {
      setApiResponse({
        severity: "error",
        message: "Error al guardar observación",
      });
    }
  };

  return (
    <form
      className="formgroup-inline justify-content-center sm-coopsana align-items-center mb-2 mt-4 grid"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputTextAreaComponent
        labelInputTextArea="Observación:"
        controlInputTextArea={control}
        errorsInputTextArea={errors}
        nameInputTextArea="observation"
        requiredInputTextArea="Este campo es requerido"
        autoFocus
      />
      <Button label="Guardar" />
    </form>
  );
}

export default FormObservationTenant;
