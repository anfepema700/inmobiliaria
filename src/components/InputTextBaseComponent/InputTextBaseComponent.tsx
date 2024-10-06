import { InputText } from "primereact/inputtext";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { classNames } from "primereact/utils";
import { useEffect, useState } from "react";
import { KeyFilterType } from "primereact/keyfilter";
import { formValidation } from "../../utilities/FormValidations";

interface Props<T extends FieldValues> {
  labelInputTextBaseComponent: string;
  nameInputTextBaseComponent: Path<T>;
  requiredInputTextBaseComponent: string | boolean;
  controlInputTextBaseComponent: Control<T>;
  errorsInputTextBaseComponent: FieldErrors;
  iconInputTextBaseComponent?: string;
  autoFocus?: boolean;
  maxLengthValue?: number;
  minLengthValue?: number;
  maxLengthMessage?: string;
  minLengthMessage?: string;
  patternValues?: RegExp;
  patternMessageInputTextBaseComponent?: string;
  keyfilterValues?: KeyFilterType;
  readonly?: boolean;
  defaultValue?: string;
  setValue?: any;
  placeholderValue?: string;
}
interface Rules {
  required: boolean | string;
  maxLength?: { value: number; message: string };
  minLength?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
}

function InputTextBaseComponent<T extends FieldValues>({
  labelInputTextBaseComponent: labelInputTextBaseComponent,
  nameInputTextBaseComponent: nameInputText,
  requiredInputTextBaseComponent: requiredInputText,
  controlInputTextBaseComponent: controlInputText,
  errorsInputTextBaseComponent: errorsInputText,
  iconInputTextBaseComponent: iconInputText,
  autoFocus = false,
  maxLengthValue,
  minLengthValue,
  maxLengthMessage = `El máximo permitido es ${maxLengthValue ?? ""}`,
  minLengthMessage = `El minimo permitido es ${minLengthValue ?? ""}`,
  patternValues,
  patternMessageInputTextBaseComponent:
    patternMessageInputText = "El valor recibido no cumple los requisitos",
  keyfilterValues,
  readonly = false,
  defaultValue,
  setValue,
  placeholderValue,
}: Props<T>): JSX.Element {
  const [rules, setRules] = useState({});
  useEffect(() => {
    const rulesAux: Rules = {
      required: requiredInputText,
    };
    if (maxLengthValue) {
      rulesAux.maxLength = {
        value: maxLengthValue,
        message: maxLengthMessage,
      };
    }
    if (minLengthValue) {
      rulesAux.minLength = {
        value: minLengthValue,
        message: minLengthMessage,
      };
    }
    if (patternValues) {
      rulesAux.pattern = {
        value: patternValues,
        message: patternMessageInputText,
      };
    }

    setRules(rulesAux);
    if (defaultValue && setValue) {
      setValue(nameInputText, defaultValue);
    }
  }, []);

  return (
    <div>
      <div className="field p-fluid">
        <label
          htmlFor={nameInputText}
          className={classNames({
            "p-error": errorsInputText[nameInputText],
          })}
        >
          {labelInputTextBaseComponent}
        </label>

        <span className={classNames({ "p-input-icon-right": iconInputText })}>
          {iconInputText && <i className={`pi ${iconInputText}`}></i>}
          <Controller
            name={nameInputText}
            control={controlInputText}
            rules={rules}
            render={({ field, fieldState }) => (
              <InputText
                id={field.name}
                {...field}
                autoFocus={autoFocus}
                className={classNames({ "p-invalid": fieldState.invalid })}
                keyfilter={keyfilterValues}
                readOnly={readonly}
                defaultValue={defaultValue}
                placeholder={placeholderValue}
              />
            )}
          />
        </span>
        {errorsInputText && formValidation(errorsInputText, nameInputText)}
      </div>
    </div>
  );
}

export default InputTextBaseComponent;
