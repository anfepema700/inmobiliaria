import { Dropdown } from "primereact/dropdown";
import { Controller, FieldValues } from "react-hook-form";
import { classNames } from "primereact/utils";
import { DropdownProperties } from "./models/dropdown.model";
import { formValidation } from "../../utilities/FormValidations";

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
}: DropdownProperties<T>): JSX.Element {
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
            placeholder={placeholderDropdown}
            options={data}
            focusInputRef={field.ref}
            onChange={(e) => {
              field.onChange(e.value);
            }}
            className={classNames({ "p-invalid": fieldState.error })}
            emptyMessage="No hay información, contacta MDA"
            emptyFilterMessage={emptyFilterMessage}
            filter={filterDropdown}
          />
        )}
      />
      {errors && formValidation(errors, nameDropdown)}
    </div>
  );
}

export default DropdownComponent;
