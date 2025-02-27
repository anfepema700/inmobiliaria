import { useForm } from "react-hook-form";
import { ApiCodebtor, CodebtorForm } from "../model/codebtor.model";
import { Button } from "primereact/button";
import InputTextBaseComponent from "../../../components/InputTextBaseComponent/InputTextBaseComponent";
import { createCodebtorService } from "../services/codebtor.service";
import { CustomMessageProps } from "../../../components/MessageComponent/models/messageComponent.model";
import { useEffect } from "react";

interface FormCodebtorProps {
  getAllCodebtor: () => void;
  setApiResponse: (params: CustomMessageProps) => void;
  coDebtorRow?: ApiCodebtor;
}
function FormCodebtor({
  getAllCodebtor,
  setApiResponse,
  coDebtorRow,
}: FormCodebtorProps): JSX.Element {
  const defaultValues: CodebtorForm = {
    document: coDebtorRow?.document ?? "",
    name: coDebtorRow?.name ?? "",
    phone: coDebtorRow?.phone ?? "",
    email: coDebtorRow?.email ?? "",
  };
  const {
    reset,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<CodebtorForm>({ defaultValues, mode: "onChange" });

  const onSubmit = async (data: CodebtorForm) => {
    try {
      const createCodebtor = await createCodebtorService(data);
      if (createCodebtor) {
        getAllCodebtor();
        reset();
        setApiResponse({
          severity: "success",
          message: "Codeudor creado con éxito",
        });
      }
    } catch (error) {
      setApiResponse({
        severity: "error",
        message: "Error al crear codeudor",
      });
    } finally {
      reset({
        document: "",
        name: "",
        phone: "",
        email: "",
      });
    }
  };

  useEffect(() => {
    if (coDebtorRow) {
      reset(coDebtorRow);
    }
  }, [coDebtorRow]);

  return (
    <form
      className="
    formgroup-inline justify-content-center align-items-center mb-2 mt-4 grid"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="col-8 md:col-2 sm:col-12">
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent="Documento:"
          nameInputTextBaseComponent="document"
          requiredInputTextBaseComponent="Documento requerido"
          autoFocus
        />
      </div>
      <div className="col-8 md:col-2 sm:col-12">
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent="Nombre:"
          nameInputTextBaseComponent="name"
          requiredInputTextBaseComponent="Nombre requerido"
        />
      </div>
      <div className="col-8 md:col-2 sm:col-12">
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent="Teléfono:"
          nameInputTextBaseComponent="phone"
          requiredInputTextBaseComponent="Teléfono requerido"
        />
      </div>
      <div className="col-8 md:col-2 sm:col-12">
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent="Correo:"
          nameInputTextBaseComponent="email"
          requiredInputTextBaseComponent="Correo requerido"
        />
      </div>
      <div className="col-3 md:col-2 sm:col-12">
        <Button label="Guardar" className="col-12" />
      </div>
    </form>
  );
}

export default FormCodebtor;
