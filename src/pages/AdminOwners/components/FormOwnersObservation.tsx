import { Button } from "primereact/button";
import InputTextAreaComponent from "../../../components/InputTextAreaComponent/InputTextAreaComponent";
import { createObservationOwnerService } from "../services/owners.service";
import { useForm } from "react-hook-form";
import { ApiOwners, OwnersObservationForm } from "../models/owners.model";
import { NotificationType } from "../../../components/ToastMessageComponent/ToastMessageComponent";
import { CustomMessageProps } from "../../../components/MessageComponent/models/messageComponent.model";

interface FormOwnersObservationProps {
  setVisibleFormObservation: (visible: boolean) => void;
  getAllOwners: () => void;
  dataOwnersRow: ApiOwners;
  setApiResponse: (params: CustomMessageProps) => void;
}
function FormOwnersObservation({
  getAllOwners,
  setVisibleFormObservation,
  dataOwnersRow,
  setApiResponse,
}: FormOwnersObservationProps) {
  const defaultValues: OwnersObservationForm = {
    observation: "",
  };
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<OwnersObservationForm>({ defaultValues, mode: "onChange" });
  const onSubmit = async (data: OwnersObservationForm) => {
    try {
      const dataForCreate: OwnersObservationForm = {
        idOwner: dataOwnersRow.idOwner,
        observation: data.observation,
      };
      const response = await createObservationOwnerService(dataForCreate);
      if (response) {
        reset();
        getAllOwners();
        setVisibleFormObservation(false);
        setApiResponse({
          severity: "success",
          message: "Observación guardada correctamente",
        });
      }

      reset();
    } catch (error) {
      setApiResponse({
        severity: "error",
        message: "Error al guardar observación",
      });
    } finally {
    }
  };

  return (
    <form
      className="formgroup-inline justify-content-center align-items-center mb-2 mt-4 grid"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputTextAreaComponent
        controlInputTextArea={control}
        errorsInputTextArea={errors}
        labelInputTextArea="Observación"
        nameInputTextArea="observation"
        requiredInputTextArea="La observación es requerida"
        autoFocus
      />
      <Button label="Guardar" />
    </form>
  );
}

export default FormOwnersObservation;
