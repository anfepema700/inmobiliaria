import { Calendar } from "primereact/calendar";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { classNames } from "primereact/utils";
import { addLocale } from "primereact/api";
import { formValidation } from "../../utilities/FormValidations";

interface Properties<T extends FieldValues> {
  labelDateName: string;
  nameDate: Path<T>;
  maxDateValue?: Date;
  minDateValue?: Date;
  dateFormatValue?: string;
  dateMessageRequired?: string | boolean;
  control: Control<T>;
  errors: FieldErrors;
  disableInput?: boolean;
  showTime?: boolean;
  showIconInputDate?: boolean;
  typeTime?: boolean;
}

function InputDateComponent<T extends FieldValues>({
  labelDateName,
  nameDate,
  maxDateValue,
  minDateValue,
  dateFormatValue = "dd/mm/yy",
  dateMessageRequired,
  control,
  errors,
  disableInput = false,
  showTime = false,
  showIconInputDate = true,
  typeTime = false,
}: Properties<T>): JSX.Element {
  addLocale("es", {
    firstDayOfWeek: 1,
    dayNames: [
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
    ],
    dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
    dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
    monthNames: [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ],
    monthNamesShort: [
      "ene",
      "feb",
      "mar",
      "abr",
      "may",
      "jun",
      "jul",
      "ago",
      "sep",
      "oct",
      "nov",
      "dic",
    ],
    today: "Hoy",
    clear: "Limpiar",
  });

  return (
    <div className="field">
      <label
        htmlFor={nameDate}
        className={classNames({
          "p-error": errors[nameDate],
        })}
      >
        {labelDateName}
      </label>

      <Controller
        name={nameDate}
        control={control}
        rules={{ required: dateMessageRequired }}
        render={({ field, fieldState }) => (
          <Calendar
            inputId={field.name}
            value={field.value}
            onChange={field.onChange}
            dateFormat={dateFormatValue}
            className={classNames({ "p-invalid": fieldState.error })}
            locale="es"
            disabled={disableInput}
            showTime={showTime}
            hourFormat="12"
            showIcon={showIconInputDate}
            timeOnly={typeTime}
            minDate={minDateValue}
            maxDate={maxDateValue}
          />
        )}
      />
      {errors && formValidation(errors, nameDate)}
    </div>
  );
}

export default InputDateComponent;
