import { useForm } from "react-hook-form";
import { ApiContract, ContractForm } from "../models/adminContract.model";
import DropdownComponent from "../../../components/DropdownComponent/DropdownComponent";
import InputTextBaseComponent from "../../../components/InputTextBaseComponent/InputTextBaseComponent";
import InputDateComponent from "../../../components/InputDateComponent/InputDateComponent";
import { Button } from "primereact/button";
import { createContractService } from "../services/contract.service";
import { DropdownData } from "../../../components";
import { CustomMessageProps } from "../../../components/MessageComponent/models/messageComponent.model";
import { useEffect } from "react";
import moment from "moment";

interface ContractInfoProps {
  dataDropdownOwner: DropdownData[];
  dataDropdownTenant: DropdownData[];
  getAllContracts: () => void;
  setApiResponse: (params: CustomMessageProps) => void;
  dataContractRow?: ApiContract;
}
function FormContract({
  dataDropdownOwner,
  dataDropdownTenant,
  getAllContracts,
  setApiResponse,
  dataContractRow,
}: ContractInfoProps): JSX.Element {
  const defaultValues: ContractForm = {
    dateStart: dataContractRow
      ? moment(dataContractRow.dateStart).toDate()
      : null,
    dateEnd: dataContractRow ? dataContractRow.dateEnd : null,
    dateNotification: dataContractRow ? dataContractRow.dateNotification : null,
    increment: dataContractRow ? dataContractRow.increment : "",
    numberContract: dataContractRow ? dataContractRow.numberContract : "",
    idTenant: dataContractRow ? String(dataContractRow.tenant.idTenant) : "",
    idOwner: dataContractRow ? String(dataContractRow.owner.idOwner) : "",
  };

  const {
    reset,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<ContractForm>({ defaultValues, mode: "onChange" });

  const onSubmit = async (data: ContractForm) => {
    try {
      const dataForSave: ContractForm = {
        ...data,
        dateStart:
          data.dateStart instanceof Date
            ? data.dateStart.toISOString().split("T")[0]
            : "",
        dateEnd:
          data.dateEnd instanceof Date
            ? data.dateEnd.toISOString().split("T")[0]
            : "",
        dateNotification:
          data.dateNotification instanceof Date
            ? data.dateNotification.toISOString().split("T")[0]
            : "",
        increment: data.increment,
        numberContract: data.numberContract,
      };
      const response = await createContractService(dataForSave);
      if (response) {
        reset();
        getAllContracts();
        setApiResponse({
          severity: "success",
          message: "Contrato creado correctamente",
        });
      }
    } catch (error) {
      setApiResponse({
        severity: "error",
        message: "Error al crear contrato",
      });
    } finally {
      reset({
        dateStart: null,
        dateEnd: null,
        dateNotification: null,
        increment: "",
        numberContract: "",
        idTenant: "",
        idOwner: "",
      });
    }
  };

  useEffect(() => {
    if (dataContractRow) {
      reset(dataContractRow);
      setValue("idTenant", String(dataContractRow.tenant.idTenant));
      setValue("idOwner", String(dataContractRow.owner.idOwner));
      setValue("dateStart", moment(dataContractRow.dateStart).toDate());
      setValue("dateEnd", moment(dataContractRow.dateEnd).toDate());
      setValue(
        "dateNotification",
        moment(dataContractRow.dateNotification).toDate()
      );
    }
  }, [dataContractRow]);
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
          autoFocus
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
          data={dataDropdownTenant}
          errors={errors}
          label="Inquilino:"
          nameDropdown="idTenant"
          emptyFilterMessage="No existen inquilinos"
          requiredDropdown="Inquilino requerido"
          filterDropdown
        />
      </div>
      <div className="col-8 md:col-3 sm:col-12">
        <DropdownComponent
          control={control}
          data={dataDropdownOwner}
          errors={errors}
          label="Propietario:"
          nameDropdown="idOwner"
          emptyFilterMessage="No existen propietarios"
          requiredDropdown="Propietario requerido"
          filterDropdown
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
          dateFormatValue="yy-mm-dd"
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
