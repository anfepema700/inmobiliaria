import { ApiCodebtor } from "../../AdminCoDebtor/model/codebtor.model";
import { ApiContract } from "../../AdminContract/models/adminContract.model";
import { ApiProperty } from "../../AdminProperty/models/adminProperty.model";

export interface TenantForm {
  idTenant?: number;
  idProperty: number | string; //asociar a inmueble,
  document: string; // cedula
  name: string; // nombre,
  policyNumber: string; // numero poliza,
  phone: string; //telefono;
  email: string; //correo;
  dayBilling: Date | null | string;
  coDebtors?: string[]; // codeudores;
}
export interface ObservationTenantForm {
  observation: string;
}
export interface ApiTenant {
  idTenant: number;
  document: string;
  name: string;
  policyNumber: string;
  phone: string;
  email: string;
  observation: string;
  dayBilling: string;
  coDebtors: ApiCodebtor[];
  property: ApiProperty;
  contract: ApiContract;
  observations: ApiObservation[];
}

export interface TenantObservationForm {
  idTenant: number;
  observation: string;
}
export interface ApiObservation {
  idObservation: number;
  observation: string;
}
