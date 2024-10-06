export interface TenantForm {
  property: string; //asociar a inmueble,
  canon: string;
  document: string; // cedula
  name: string; // nombre,
  contractNumber: string; //numero contrato,
  policyNumber: string; // numero poliza,
  phone: string; //telefono;
  email: string; //correo;
  coDebtors: string[]; // codeudores;
}
export interface ObservationTenantForm {
  observation: string;
}
