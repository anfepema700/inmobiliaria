import moment from "moment";
import { useForm } from "react-hook-form";
import DropdownComponent from "../../../components/DropdownComponent/DropdownComponent";
import InputTextBaseComponent from "../../../components/InputTextBaseComponent/InputTextBaseComponent";
import InputDateComponent from "../../../components/InputDateComponent/InputDateComponent";
import {
  ApiBillingTenant,
  FormDataBillingTenant,
} from "../models/billingTenant.model";
import { Button } from "primereact/button";
import { useEffect } from "react";
import { ApiTenant } from "../../AdminTenant/models/tenant.model";
import { ApiProperty } from "../../AdminProperty/models/adminProperty.model";
import {
  dataPropertyDropdownAdapter,
  dataTenantDropdownAdapter,
} from "../adapters/billingTenant.adapter";
import { CustomMessageProps } from "../../../components/MessageComponent/models/messageComponent.model";
import { createBillingTenantService } from "../service/billingTenant.service";

interface Props {
  dataProperty: ApiProperty[];
  tenantData: ApiTenant[];
  setApiResponse: (params: CustomMessageProps) => void;
  dataBillingTenantRow?: ApiBillingTenant;
  getAllBillingData: () => void;
}
function FormBillingTenant({
  dataProperty,
  tenantData,
  setApiResponse,
  dataBillingTenantRow,
  getAllBillingData,
}: Props): JSX.Element {
  const defaultValues: FormDataBillingTenant = {
    idTenant: dataBillingTenantRow
      ? String(dataBillingTenantRow.tenant.idTenant)
      : "",
    canon: dataBillingTenantRow ? dataBillingTenantRow.canon : "",
    dayBilling: dataBillingTenantRow ? dataBillingTenantRow.dayBilling : "",
    idProperty: dataBillingTenantRow
      ? String(dataBillingTenantRow.property.idProperty)
      : "",
    bill: dataBillingTenantRow ? dataBillingTenantRow.bill : "",
    datePayment: dataBillingTenantRow
      ? dataBillingTenantRow.datePayment
      : new Date(),
    paymentReceiptNumber: dataBillingTenantRow
      ? dataBillingTenantRow.paymentReceiptNumber
      : "",
    observation: dataBillingTenantRow ? dataBillingTenantRow.observation : "",
  };
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
    setValue,
  } = useForm<FormDataBillingTenant>({ defaultValues, mode: "onChange" });

  const onSubmit = async (data: FormDataBillingTenant) => {
    try {
      const response = await createBillingTenantService(data);
      if (response) {
        setApiResponse({
          severity: "success",
          message: "Cobro creado correctamente",
        });
        reset();
      }
    } catch (error) {
      setApiResponse({
        severity: "error",
        message: "Error al crear cobro",
      });
    } finally {
      getAllBillingData();
      reset({
        idTenant: "",
        canon: "",
        dayBilling: "",
        idProperty: "",
        bill: "",
        datePayment: new Date(),
        paymentReceiptNumber: "",
        observation: "",
      });
    }
  };

  const watchTenant = watch("idTenant");
  useEffect(() => {
    const dataTenant = tenantData.find((tenant) => {
      return String(tenant.idTenant) === String(watchTenant);
    });
    setValue("canon", dataTenant?.property.canon ?? "0");
    setValue("dayBilling", dataTenant?.dayBilling ?? "0");
    setValue("idProperty", String(dataTenant?.property.idProperty));
  }, [watchTenant]);

  useEffect(() => {
    if (dataBillingTenantRow) {
      reset(dataBillingTenantRow);
      setValue("idTenant", String(dataBillingTenantRow?.tenant.idTenant));
      setValue("datePayment", new Date(dataBillingTenantRow.datePayment));
    }
  }, [dataBillingTenantRow]);

  return (
    <form
      className="formgroup-inline justify-content-center sm-coopsana align-items-center mb-2 mt-4 grid"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="col-8 md:col-3 sm:col-12">
        <DropdownComponent
          control={control}
          data={dataTenantDropdownAdapter(tenantData)}
          errors={errors}
          label="Inquilino"
          nameDropdown="idTenant"
          autoFocusDropdown
          requiredDropdown="Inquilino requerido"
          filterDropdown
        />
      </div>
      <div className="col-8 md:col-3 sm:col-12">
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent="Canon"
          nameInputTextBaseComponent="canon"
          requiredInputTextBaseComponent="Canon requerido"
          disableInput
        />
      </div>
      <div className="col-8 md:col-3 sm:col-12">
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent="Dia de facturación"
          nameInputTextBaseComponent="dayBilling"
          requiredInputTextBaseComponent="Dia de facturación requerido"
          disableInput
        />
      </div>
      <div className="col-8 md:col-3 sm:col-12">
        <DropdownComponent
          control={control}
          data={dataPropertyDropdownAdapter(dataProperty)}
          errors={errors}
          label="Inmueble"
          nameDropdown="idProperty"
          filterDropdown
          requiredDropdown="Inmueble requerido"
          disabledDropdwown
        />
      </div>
      <div className="col-8 md:col-3 sm:col-12">
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent="Factura"
          nameInputTextBaseComponent="bill"
          requiredInputTextBaseComponent="Factura requerida"
        />
      </div>
      <div className="col-8 md:col-3 sm:col-12">
        <InputDateComponent
          control={control}
          errors={errors}
          labelDateName="Fecha de pago"
          nameDate="datePayment"
          dateFormatValue="yy/mm/dd"
          dateMessageRequired="Fecha de pago requerida"
        />
      </div>
      <div className="col-8 md:col-3 sm:col-12">
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent="Recibo de pago"
          nameInputTextBaseComponent="paymentReceiptNumber"
          requiredInputTextBaseComponent="Recibo de pago requerido"
        />
      </div>
      <div className="col-8 md:col-3 sm:col-12">
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent="Observación"
          nameInputTextBaseComponent="observation"
          requiredInputTextBaseComponent="Observación requerida"
        />
      </div>
      <div className="flex align-content-center flex-wrap col-3">
        <Button label="Guardar" />
      </div>
    </form>
  );
}

export default FormBillingTenant;
