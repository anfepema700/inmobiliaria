import { useForm } from "react-hook-form";
import { CodebtorForm } from "../model/codebtor.model";
import { Button } from "primereact/button";
import InputTextBaseComponent from "../../../components/InputTextBaseComponent/InputTextBaseComponent";

function FormCodebtor(): JSX.Element {
  const defaultValues: CodebtorForm = {
    document: "",
    name: "",
    phone: "",
    email: "",
  };
  const {
    reset,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<CodebtorForm>({ defaultValues, mode: "onChange" });

  const onSubmit = (data: CodebtorForm) => {
    console.log(data);
  };
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
          requiredInputTextBaseComponent
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
          requiredInputTextBaseComponent
        />
      </div>
      <div className="flex align-content-center flex-wrap col-3 md:col-2 sm:col-12">
        <Button label="Guardar" className="" />
      </div>
    </form>
  );
}

export default FormCodebtor;
