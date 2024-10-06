import { Control, FieldErrors, FieldValues, Path } from "react-hook-form";

export interface MultiSelectData {
  name: string;
  code: string;
}
export interface MultiSelectProperties<T extends FieldValues> {
  labelMultiSelect: string;
  nameMultiSelect: Path<T>;
  control: Control<T>;
  errors: FieldErrors;
  data: MultiSelectData[] | undefined;
  placeholderMultiSelect?: string;
  requiredMultiSelect?: string;
  autoFocusMultiSelect?: boolean;
  filterMultiSelect?: boolean;
  maxSelectedLabelsMultiSelect?: number;
  emptyFilterMessageMultiselect?: string;
}
