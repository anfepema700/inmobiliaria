import { FieldErrors } from "react-hook-form";

export function formValidation(
  errors: FieldErrors,
  errorKey: string
): JSX.Element | "" {
  return errors[errorKey] ? (
    <small className="p-error">{errors[errorKey]?.message?.toString()}</small>
  ) : (
    ""
  );
}
