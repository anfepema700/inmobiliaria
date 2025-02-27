import { Dropdown } from "primereact/dropdown";
import { Controller, FieldValues } from "react-hook-form";
import { classNames } from "primereact/utils";
import { DropdownProperties } from "./models/dropdown.model";
import { formValidation } from "../../utilities/FormValidations";
import { useState } from "react";

function DropdownComponent<T extends FieldValues>({
  label,
  nameDropdown,
  placeholderDropdown,
  requiredDropdown,
  control,
  errors,
  autoFocusDropdown,
  data,
  filterDropdown = false,
  emptyFilterMessage,
  showClear,

  disabledDropdwown,
}: DropdownProperties<T>): JSX.Element {
  const [showClearValue, setShowClearValue] = useState(false);
  return (
    <div className="field p-fluid">
      <label
        htmlFor={nameDropdown}
        className={classNames({
          "p-error": errors[nameDropdown],
        })}
      >
        {label}
      </label>
      <Controller
        name={nameDropdown}
        control={control}
        rules={{ required: requiredDropdown }}
        render={({ field, fieldState }) => (
          <Dropdown
            id={field.name}
            value={field.value}
            autoFocus={autoFocusDropdown}
            optionLabel="name"
            optionValue="code"
            placeholder={placeholderDropdown}
            options={data}
            focusInputRef={field.ref}
            onChange={(e) => {
              field.onChange(e.value);
              if (e.value) {
                setShowClearValue(true);
              } else {
                setShowClearValue(false);
              }
            }}
            className={classNames({ "p-invalid": fieldState.error })}
            emptyMessage="No hay información"
            emptyFilterMessage={emptyFilterMessage}
            filter={filterDropdown}
            showClear={showClear ? showClearValue : false}
            disabled={disabledDropdwown}
          />
        )}
      />
      {errors && formValidation(errors, nameDropdown)}
    </div>
  );
}

export default DropdownComponent;
