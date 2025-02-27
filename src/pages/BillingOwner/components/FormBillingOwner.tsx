import { useForm } from "react-hook-form";
import DropdownComponent from "../../../components/DropdownComponent/DropdownComponent";
import {
  ApiBillingOwner,
  BillingOwnerFormData,
} from "../models/billingOwner.model";
import InputTextBaseComponent from "../../../components/InputTextBaseComponent/InputTextBaseComponent";
import InputDateComponent from "../../../components/InputDateComponent/InputDateComponent";
import { Button } from "primereact/button";
import { ApiOwners } from "../../AdminOwners/models/owners.model";
import {
  dropdownDataBillingOwnerAdapter,
  dropdownPropertyBillingOwnerAdapter,
} from "../adapters/bilingOwner.adapter";
import { useEffect, useState } from "react";
import { DropdownData } from "../../../components";
import { createBillingOwnerService } from "../services/billingOwner.service";
import { CustomMessageProps } from "../../../components/MessageComponent/models/messageComponent.model";
import { ApiProperty } from "../../AdminProperty/models/adminProperty.model";
import moment from "moment";

interface FormBillingOwnerProps {
  dataOwners: ApiOwners[];
  setApiResponse: (param: CustomMessageProps) => void;
  getAllBillingOwners: () => void;
  dataBillingOwnerRow?: ApiBillingOwner;
}
function FormBillingOwner({
  dataOwners,
  setApiResponse,
  getAllBillingOwners,
  dataBillingOwnerRow,
}: FormBillingOwnerProps): JSX.Element {
  const [propertyDropdown, setPropertyDropdown] = useState<DropdownData[]>([]);
  const [valueSuggestion, setValueSuggestion] = useState<number>(0);
  const [propertySelected, setPropertySelected] = useState<ApiProperty>();
  const [canonSelected, setCanonSelected] = useState<number>(0);
  const [valueToPayAprox, setValueToPayAprox] = useState<number>(0);

  const defaultValues = {
    idOwner: String(dataBillingOwnerRow?.owner.idOwner) ?? "",
    comissionPercentage: dataBillingOwnerRow
      ? dataBillingOwnerRow.comissionPercentage
      : "",
    comissionValue: dataBillingOwnerRow
      ? dataBillingOwnerRow.comissionValue
      : "",
    fourPerThousand: dataBillingOwnerRow
      ? dataBillingOwnerRow.fourPerThousand
      : "",
    valueToPayment: dataBillingOwnerRow
      ? dataBillingOwnerRow.valueToPayment
      : "",
    idProperty: String(dataBillingOwnerRow?.property.idProperty) ?? "",
    discharge: dataBillingOwnerRow ? dataBillingOwnerRow.discharge : "",
    datePayment: dataBillingOwnerRow
      ? dataBillingOwnerRow.datePayment
      : new Date(),
    observation: dataBillingOwnerRow ? dataBillingOwnerRow.observation : "",
  };
  const {
    reset,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<BillingOwnerFormData>({
    defaultValues,
    mode: "onChange",
  });
  const onSubmit = async (data: BillingOwnerFormData) => {
    try {
      const dataForCreate: BillingOwnerFormData = {
        ...data,
        datePayment:
          data.datePayment instanceof Date
            ? data.datePayment.toISOString().split("T")[0]
            : "",
      };
      const response = await createBillingOwnerService(dataForCreate);
      if (response) {
        setApiResponse({
          severity: "success",
          message: "Cobro creado correctamente",
        });
        getAllBillingOwners();
        reset();
      }
    } catch (error) {
      setApiResponse({
        severity: "error",
        message: "Error al crear cobro",
      });
    } finally {
      getAllBillingOwners();
      reset({
        idOwner: "",
        comissionPercentage: "",
        comissionValue: "",
        fourPerThousand: "",
        valueToPayment: "",
        idProperty: "",
        discharge: "",
        datePayment: new Date(),
        observation: "",
      });
    }
  };
  const watchOwner = watch("idOwner");
  const watchProperty = watch("idProperty");
  const watchCommission = watch("comissionPercentage");
  const watchFourPerThousand = watch("fourPerThousand");
  const watchCommissionValue = watch("comissionValue");
  useEffect(() => {
    const findProperties = dataOwners.find((owner) => {
      return String(owner.idOwner) === String(watchOwner);
    });

    if (!findProperties) {
      return;
    }
    setValue("comissionPercentage", findProperties.percentageCommission);
    const { properties } = findProperties ?? {};
    if (properties.length > 0) {
      setPropertyDropdown(dropdownPropertyBillingOwnerAdapter(properties));
      const findProperty = properties.find((property) => {
        return String(property.idProperty) === String(watchProperty);
      });
      if (!findProperty) {
        return;
      }
      const valueComissionSugestion = findProperty
        ? +findProperty?.canon * (+watchCommission / 100) +
          +findProperty?.canon * (+watchCommission / 100) * 0.19
        : 0;
      setValueSuggestion(valueComissionSugestion);
      setPropertySelected(findProperty);
      setCanonSelected(+findProperty?.canon);
      const valueAprox =
        canonSelected - (+watchCommissionValue + +watchFourPerThousand);
      setValueToPayAprox(valueAprox);
    }
  }, [
    watchOwner,
    dataOwners,
    watchProperty,
    watchFourPerThousand,
    watchCommissionValue,
  ]);
  useEffect(() => {
    if (dataBillingOwnerRow) {
      reset(dataBillingOwnerRow);
      setValue("idOwner", String(dataBillingOwnerRow?.owner.idOwner));
      setValue(
        "datePayment",
        moment(dataBillingOwnerRow?.datePayment).toDate()
      );
      setValue("idProperty", String(dataBillingOwnerRow?.property.idProperty));
    }
  }, [dataBillingOwnerRow]);

  return (
    <form
      className="formgroup-inline justify-content-center align-items-center mb-2 mt-4 grid"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="col-8 md:col-3 sm:col-12">
        <DropdownComponent
          control={control}
          data={dropdownDataBillingOwnerAdapter(dataOwners)}
          errors={errors}
          label="Propietario"
          nameDropdown="idOwner"
          autoFocusDropdown
          requiredDropdown="Propietario es requerido"
          filterDropdown
        />
      </div>

      <div className="col-8 md:col-3 sm:col-12">
        <DropdownComponent
          control={control}
          data={propertyDropdown}
          errors={errors}
          label={`Propiedad: ${
            propertySelected?.canon ? "canon " + propertySelected?.canon : ""
          } `}
          nameDropdown="idProperty"
          requiredDropdown="Propiedad es requerido"
          filterDropdown
          disabledDropdwown={propertyDropdown.length > 0 ? false : true}
        />
      </div>

      <div className="col-8 md:col-3 sm:col-12">
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent="Comisión porcentaje"
          nameInputTextBaseComponent="comissionPercentage"
          requiredInputTextBaseComponent="Comisión porcentaje es requerido"
        />
      </div>
      <div className="col-8 md:col-3 sm:col-12">
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent={`Valor comisión ${
            valueSuggestion ? "(" + valueSuggestion + ")" : ""
          }`}
          nameInputTextBaseComponent="comissionValue"
          requiredInputTextBaseComponent="Valor comisión es requerido"
        />
      </div>
      <div className="col-8 md:col-3 sm:col-12">
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent="Valor del 4 * 1000"
          nameInputTextBaseComponent="fourPerThousand"
          requiredInputTextBaseComponent={false}
        />
      </div>
      <div className="col-8 md:col-3 sm:col-12">
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent="Valor a pagar"
          nameInputTextBaseComponent="valueToPayment"
          requiredInputTextBaseComponent="Valor a pagar es requerido"
          placeholderValue={
            valueToPayAprox > 0 ? `aprox. ${valueToPayAprox}` : ""
          }
        />
      </div>

      <div className="col-8 md:col-3 sm:col-12">
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent="Numero de egreso"
          nameInputTextBaseComponent="discharge"
          requiredInputTextBaseComponent="Número de egreso es requerido"
        />
      </div>
      <div className="col-8 md:col-3 sm:col-12">
        <InputDateComponent
          control={control}
          errors={errors}
          labelDateName="Fecha de pago"
          nameDate="datePayment"
          dateFormatValue="yy/mm/dd"
        />
      </div>
      <div className="col-8 md:col-3 sm:col-12">
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent="Observaciones"
          nameInputTextBaseComponent="observation"
          requiredInputTextBaseComponent={false}
        />
      </div>
      <div className="flex align-content-center flex-wrap col-4">
        <Button label="Guardar" />
      </div>
    </form>
  );
}

export default FormBillingOwner;
