import { useForm } from "react-hook-form";
import { ApiProperty, PropertyForm } from "../models/adminProperty.model";
import InputTextBaseComponent from "../../../components/InputTextBaseComponent/InputTextBaseComponent";
import DropdownComponent from "../../../components/DropdownComponent/DropdownComponent";
import { Button } from "primereact/button";
import { DropdownData } from "../../../components";
import { createPropertyService } from "../services/property.service";
import { useEffect } from "react";
import { CustomMessageProps } from "../../../components/MessageComponent/models/messageComponent.model";

interface FormPropertyProps {
  dropdownOwner: DropdownData[];
  getAllProperties: () => void;
  rowDataProperty?: ApiProperty;
  setApiResponse: (params: CustomMessageProps) => void;
}
function FormProperty({
  dropdownOwner,
  getAllProperties,
  rowDataProperty,
  setApiResponse,
}: FormPropertyProps): JSX.Element {
  const defaultValues: PropertyForm = {
    nameProperty: rowDataProperty?.nameProperty ?? "",
    address: rowDataProperty?.address ?? "",
    canon: rowDataProperty?.canon ?? "",
    administrationPayment: rowDataProperty?.administrationPayment ?? "",
    idOwner: String(rowDataProperty?.owner.idOwner) ?? "",
  };
  const {
    reset,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<PropertyForm>({ defaultValues, mode: "onChange" });

  const onSubmit = async (data: PropertyForm) => {
    try {
      const createProperty = await createPropertyService(data);
      if (createProperty) {
        getAllProperties();
        reset();
        setApiResponse({
          severity: "success",
          message: "Propiedad creada correctamente",
        });
      }
    } catch (error) {
      setApiResponse({
        severity: "error",
        message: "Error al crear propiedad",
      });
    } finally {
      reset({
        nameProperty: "",
        address: "",
        canon: "",
        idOwner: "",
        administrationPayment: "",
      });
    }
  };

  useEffect(() => {
    if (rowDataProperty) {
      reset(rowDataProperty);
      setValue("idOwner", String(rowDataProperty.owner.idOwner));
    }
  }, [rowDataProperty]);

  return (
    <form
      className="
    formgroup-inline justify-content-center align-items-center mb-2 mt-4 grid"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="col-3 md:col-3 sm:col-12">
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent="Nombre:"
          nameInputTextBaseComponent="nameProperty"
          requiredInputTextBaseComponent="El nombre es requerida"
          autoFocus
        />
      </div>

      <div className="col-3 md:col-3 sm:col-12">
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent="Dirección:"
          nameInputTextBaseComponent="address"
          requiredInputTextBaseComponent="La dirección es requerida"
        />
      </div>
      <div className="col-3 md:col-2 sm:col-12">
        <DropdownComponent
          control={control}
          data={dropdownOwner}
          errors={errors}
          label="Propietario:"
          nameDropdown="idOwner"
          emptyFilterMessage="No hay propietarios"
          filterDropdown
          requiredDropdown="El propietario es requerido"
        />
      </div>
      <div className="col-3 md:col-2 sm:col-12">
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent="Canon:"
          nameInputTextBaseComponent="canon"
          requiredInputTextBaseComponent="El canon es requerido"
        />
      </div>
      <div className="col-3 md:col-2 sm:col-12">
        <InputTextBaseComponent
          controlInputTextBaseComponent={control}
          errorsInputTextBaseComponent={errors}
          labelInputTextBaseComponent="Administración:"
          nameInputTextBaseComponent="administrationPayment"
          requiredInputTextBaseComponent={false}
        />
      </div>

      <div className="flex align-content-center flex-wrap col-4">
        <Button label="Guardar" />
      </div>
    </form>
  );
}

export default FormProperty;
