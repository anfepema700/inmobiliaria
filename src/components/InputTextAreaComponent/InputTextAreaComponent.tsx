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
import { InputTextarea } from "primereact/inputtextarea";
import { formValidation } from "../../utilities/FormValidations";

interface Props<T extends FieldValues> {
  showCountCharaters?: string;
  rowsInputText?: number;
  colsInputText?: number;
  labelInputText: string;
  nameInputText: Path<T>;
  requiredInputText: string | boolean;
  controlInputText: Control<T>;
  errorsInputText: FieldErrors;
  iconInputText?: string;
  autoFocus?: boolean;
  maxLengthValue?: number;
  minLengthValue?: number;
  maxLengthMessage?: string;
  minLengthMessage?: string;
  patternValues?: RegExp;
  patternMessageInputText?: string;
  keyfilterValues?: KeyFilterType;
  readonly?: boolean;
  defaultValue?: string;
  setValue?: any;
  autoResizeInputText?: boolean;
}
interface Rules {
  required: boolean | string;
  maxLength?: { value: number; message: string };
  minLength?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
}

function InputTextAreaComponent<T extends FieldValues>({
  showCountCharaters = "",
  rowsInputText,
  colsInputText,
  labelInputText,
  nameInputText,
  requiredInputText,
  controlInputText,
  errorsInputText,
  iconInputText,
  autoFocus = false,
  maxLengthValue,
  minLengthValue,
  maxLengthMessage = `El máximo permitido es ${maxLengthValue ?? ""}`,
  minLengthMessage = `El minimo permitido es ${minLengthValue ?? ""}`,
  patternValues,
  patternMessageInputText = "El valor recibido no cumple los requisitos",
  keyfilterValues,
  readonly = false,
  defaultValue,
  setValue,
  autoResizeInputText,
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
          {labelInputText}
        </label>

        <span className={classNames({ "p-input-icon-right": iconInputText })}>
          {iconInputText && <i className={`pi ${iconInputText}`}></i>}
          <Controller
            name={nameInputText}
            control={controlInputText}
            rules={rules}
            render={({ field, fieldState }) => (
              <InputTextarea
                rows={rowsInputText}
                id={field.name}
                {...field}
                autoFocus={autoFocus}
                className={classNames({ "p-invalid": fieldState.error })}
                keyfilter={keyfilterValues}
                readOnly={readonly}
                defaultValue={defaultValue}
                cols={colsInputText}
                autoResize={autoResizeInputText}
              />
            )}
          />
          {showCountCharaters && (
            <span>{`${showCountCharaters.length} / ${String(
              maxLengthValue
            )}`}</span>
          )}
        </span>
        {errorsInputText && formValidation(errorsInputText, nameInputText)}
      </div>
    </div>
  );
}

export default InputTextAreaComponent;
