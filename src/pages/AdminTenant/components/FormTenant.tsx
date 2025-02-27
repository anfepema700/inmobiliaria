import { useForm } from "react-hook-form";
import { ApiTenant, TenantForm } from "../models/tenant.model";
import InputTextBaseComponent from "../../../components/InputTextBaseComponent/InputTextBaseComponent";
import DropdownComponent from "../../../components/DropdownComponent/DropdownComponent";
import MultiSelectComponent from "../../../components/MultiselectComponent/MultiselectComponent";
import { Button } from "primereact/button";
import { DropdownData } from "../../../components";
import { useEffect } from "react";
import { createTenantService } from "../services/tenant.service";
import { CustomMessageProps } from "../../../components/MessageComponent/models/messageComponent.model";

interface FormTenantProps {
  propertiesDropdown: DropdownData[];
  codebtorDropdown: DropdownData[];
  dataRowTenant?: ApiTenant;
  getAllTenants: () => void;
  setApiResponse: (params: CustomMessageProps) => void;
}
function FormTenant({
  codebtorDropdown,
  propertiesDropdown,
  dataRowTenant,
  getAllTenants,
  setApiResponse,
}: FormTenantProps): JSX.Element {
  const defaultValues: TenantForm = {
    idProperty: dataRowTenant?.property
      ? String(dataRowTenant?.property.idProperty)
      : "",
    document: dataRowTenant ? dataRowTenant.document : "",
    name: dataRowTenant?.name ?? "",
    policyNumber: dataRowTenant?.policyNumber ?? "",
    dayBilling: dataRowTenant?.dayBilling ?? "",
    phone: dataRowTenant?.phone ?? "",
    email: dataRowTenant?.email ?? "",
    coDebtors:
      dataRowTenant?.coDebtors.map((codebtor) => String(codebtor.idCoDebtor)) ??
      [],
  };
  const {
    reset,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<TenantForm>({ defaultValues, mode: "onChange" });
  const onSubmit = async (data: TenantForm) => {
    try {
      const createTenant = await createTenantService(data);
      if (createTenant) {
        getAllTenants();
        reset();
        setApiResponse({
          severity: "success",
          message: "Inquilino creado correctamente",
        });
      }
    } catch (error) {
      setApiResponse({
        severity: "error",
        message: "Error al crear inquilino",
      });
    } finally {
      reset({
        idProperty: "",
        document: "",
        name: "",
        policyNumber: "",
        phone: "",
        email: "",
        dayBilling: "",
        coDebtors: [],
      });
      getAllTenants();
    }
  };

  useEffect(() => {
    if (!dataRowTenant) return;
    const dataRowAdapter: TenantForm = {
      ...dataRowTenant,
      coDebtors: dataRowTenant?.coDebtors
        ? dataRowTenant?.coDebtors.map((codebtor) =>
            String(codebtor.idCoDebtor)
          )
        : [],
      idProperty: dataRowTenant?.property
        ? String(dataRowTenant?.property.idProperty)
        : "",
    };
    reset(dataRowAdapter);
  }, [dataRowTenant, reset]);

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
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent="Día de facturación:"
          nameInputTextBaseComponent="dayBilling"
          requiredInputTextBaseComponent="El campo fecha de facturación es requerido"
        />
      </div>
      <div className="col-8 md:col-3 sm:col-12">
        <MultiSelectComponent
          control={control}
          data={codebtorDropdown}
          errors={errors}
          labelMultiSelect="Codeudores:"
          nameMultiSelect="coDebtors"
          filterMultiSelect
          placeholderMultiSelect="Seleccione un codeudor"
        />
      </div>
      <div className="col-8 md:col-3 sm:col-12">
        <DropdownComponent
          control={control}
          data={propertiesDropdown}
          errors={errors}
          label="Inmueble:"
          nameDropdown="idProperty"
          requiredDropdown="El campo propietario es requerido"
          filterDropdown
          placeholderDropdown="Seleccione un inmueble"
        />
      </div>

      <div className="flex align-content-center flex-wrap col-3">
        <Button label="Guardar" className="" />
      </div>
    </form>
  );
}

export default FormTenant;
