import { classNames } from "primereact/utils";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { InputSwitch } from "primereact/inputswitch";
import { formValidation } from "../../utilities/FormValidations";

interface InputSwitchProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  requiredSwitch?: string | boolean;
  errors: FieldErrors;
  complementText?: string;
}

function SwitchComponent<T extends FieldValues>({
  name,
  control,
  errors,
  label,
  requiredSwitch,
  complementText,
}: InputSwitchProps<T>): JSX.Element {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: requiredSwitch }}
      render={({ field, fieldState }) => (
        <div className="grid align-items-center justify-content-center mb-5 mt-5">
          <div>
            <label
              htmlFor={name}
              className={classNames({ "p-error": errors.checked })}
            >
              {label}
            </label>
          </div>

          <div className="ml-3">
            <InputSwitch
              inputId={field.name}
              checked={field.value}
              inputRef={field.ref}
              className={classNames({ "p-invalid": fieldState.error })}
              onChange={(e) => {
                field.onChange(e.value);
              }}
            />
            {errors && formValidation(errors, name)}
          </div>
        </div>
      )}
    />
  );
}
export default SwitchComponent;
