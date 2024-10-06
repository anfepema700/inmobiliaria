import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import { Controller, FieldValues } from "react-hook-form";

import { classNames } from "primereact/utils";
import { MultiSelectProperties } from "./models/multiselectComponent.model";
import { formValidation } from "../../utilities/FormValidations";

function MultiSelectComponent<T extends FieldValues>({
  labelMultiSelect,
  nameMultiSelect,
  control,
  errors,
  data,
  placeholderMultiSelect,
  requiredMultiSelect,
  autoFocusMultiSelect,
  filterMultiSelect,
  maxSelectedLabelsMultiSelect = 2,
  emptyFilterMessageMultiselect = "No hay resultados",
}: MultiSelectProperties<T>): JSX.Element {
  return (
    <div className="field p-fluid">
      <label
        htmlFor={labelMultiSelect}
        className={classNames({
          "p-error": errors[nameMultiSelect],
        })}
      >
        {labelMultiSelect}
      </label>
      <Controller
        name={nameMultiSelect}
        control={control}
        rules={{ required: requiredMultiSelect }}
        render={({ field, fieldState }) => (
          <MultiSelect
            id={field.name}
            name="value"
            value={field.value}
            options={data}
            autoFocus={autoFocusMultiSelect}
            filter={filterMultiSelect}
            className={classNames({ "p-invalid": fieldState.invalid })}
            onChange={(e: MultiSelectChangeEvent) => {
              field.onChange(e.value);
            }}
            optionLabel="name"
            optionValue="code"
            placeholder={placeholderMultiSelect}
            maxSelectedLabels={maxSelectedLabelsMultiSelect}
            selectedItemsLabel={`{0} ${labelMultiSelect}`}
            emptyFilterMessage={emptyFilterMessageMultiselect}
          />
        )}
      />
      {errors && formValidation(errors, nameMultiSelect)}
    </div>
  );
}

export default MultiSelectComponent;
