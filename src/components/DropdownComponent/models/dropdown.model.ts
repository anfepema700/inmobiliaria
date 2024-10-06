import { Control, FieldErrors, FieldValues, Path } from "react-hook-form";

export interface DropdownData {
  name: string;
  code: string;
}
export interface DropdownProperties<T extends FieldValues> {
  label: string;
  nameDropdown: Path<T>;
  control: Control<T>;
  errors: FieldErrors;
  data: DropdownData[] | undefined;
  placeholderDropdown?: string;
  requiredDropdown?: string;
  autoFocusDropdown?: boolean;
  filterDropdown?: boolean;
  emptyFilterMessage?: string;
}
