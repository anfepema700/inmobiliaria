import { useForm } from "react-hook-form";
import InputTextBaseComponent from "../../../components/InputTextBaseComponent/InputTextBaseComponent";
import { ApiOwners, OwnersForm } from "../models/owners.model";
import SwitchComponent from "../../../components/SwitchComponent/SwitchComponent";
import { Button } from "primereact/button";

import { createOwnersService } from "../services/owners.service";
import { useEffect } from "react";
import { CustomMessageProps } from "../../../components/MessageComponent/models/messageComponent.model";
import { DropdownData } from "../../../components";
import DropdownComponent from "../../../components/DropdownComponent/DropdownComponent";

interface FormOwnersProps {
  ownerDataRow?: ApiOwners;
  getAllOwners: () => void;
  setApiResponse: (params: CustomMessageProps) => void;
}
function FormOwners({
  ownerDataRow,
  getAllOwners,
  setApiResponse,
}: FormOwnersProps) {
  const defaultValues: OwnersForm = {
    document: ownerDataRow?.document ?? "",
    name: ownerDataRow?.name ?? "",
    phone: ownerDataRow?.phone ?? "",
    address: ownerDataRow?.address ?? "",
    email: ownerDataRow?.email ?? "",
    percentageCommission: ownerDataRow?.percentageCommission ?? "",
    fourPerThousand: ownerDataRow?.fourPerThousand ?? false,
    fourPerThousandValue: ownerDataRow?.fourPerThousandValue ?? 0,
    accountNumber: ownerDataRow?.accountNumber ?? "",
    accountType: ownerDataRow?.accountType ?? "",
    bank: ownerDataRow?.bank ?? "",
  };
  const {
    reset,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<OwnersForm>({ defaultValues, mode: "onChange" });

  const onSubmit = async (data: OwnersForm) => {
    try {
      const response = await createOwnersService(data);
      if (response) {
        getAllOwners();
        setApiResponse({
          severity: "success",
          message: "Propietario creado correctamente",
        });
      }
      reset();
    } catch (error) {
      setApiResponse({
        severity: "error",
        message: "Error al crear propietario",
      });
    } finally {
      reset({
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
      });
      getAllOwners();
    }
  };
  useEffect(() => {
    reset(ownerDataRow);
  }, [ownerDataRow, reset]);

  const accountType: DropdownData[] = [
    { name: "Cuenta Ahorros", code: "Ahorros" },
    { name: "Cuenta Corriente", code: "Corriente" },
  ];

  return (
    <form
      className="formgroup-inline justify-content-center align-items-center mb-2 mt-4 grid"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="col-12 md:col-3 sm:col-12">
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent="Documento:"
          nameInputTextBaseComponent="document"
          requiredInputTextBaseComponent="Documento requerido"
          autoFocus
        />
      </div>
      <div className="col-12 md:col-3 sm:col-12">
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent="Nombre:"
          nameInputTextBaseComponent="name"
          requiredInputTextBaseComponent="Nombre requerido"
        />
      </div>
      <div className="col-12 md:col-3 sm:col-12">
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent="Teléfono:"
          nameInputTextBaseComponent="phone"
          requiredInputTextBaseComponent="Telefóno requerido"
        />
      </div>
      <div className="col-12 md:col-3 sm:col-12">
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent="Dirección:"
          nameInputTextBaseComponent="address"
          requiredInputTextBaseComponent="Dirección requerida"
        />
      </div>
      <div className="col-12 md:col-3 sm:col-12">
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent="Correo:"
          nameInputTextBaseComponent="email"
          requiredInputTextBaseComponent="Correo requerido"
        />
      </div>
      <div className="col-12 md:col-3 sm:col-12">
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent="Banco:"
          nameInputTextBaseComponent="bank"
          requiredInputTextBaseComponent="Banco requerido"
        />
      </div>
      <div className="col-12 md:col-3 sm:col-12">
        <DropdownComponent
          control={control}
          data={accountType}
          errors={errors}
          label="Tipo de cuenta"
          nameDropdown="accountType"
          requiredDropdown="Tipo de cuenta requerido"
        />
      </div>
      <div className="col-12 md:col-3 sm:col-12">
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent="Número de cuenta:"
          nameInputTextBaseComponent="accountNumber"
          requiredInputTextBaseComponent="Numero de cuenta requerido"
        />
      </div>

      <div className="col-12 md:col-3 sm:col-12">
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent="Porcentaje de comisión %:"
          nameInputTextBaseComponent="percentageCommission"
          requiredInputTextBaseComponent="Porcentaje de comisión % requerido"
        />
      </div>

      <div className="col-12 md:col-3 sm:col-12">
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent="Valor cuatro por mil:"
          nameInputTextBaseComponent="fourPerThousandValue"
          requiredInputTextBaseComponent="Valor cuatro por mil requerido"
        />
      </div>
      <div className="col-12 md:col-3 sm:col-12">
        <SwitchComponent
          control={control}
          errors={errors}
          label="Cuatro por mil"
          name="fourPerThousand"
        />
      </div>

      <div className="flex align-content-center flex-wrap col-6">
        <Button label="Guardar" />
      </div>
    </form>
  );
}

export default FormOwners;
