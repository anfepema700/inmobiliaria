import { ApiCodebtor } from "../../AdminCoDebtor/model/codebtor.model";
import { ApiProperty } from "../../AdminProperty/models/adminProperty.model";
import { ApiObservation, ApiTenant } from "../models/tenant.model";

export const codebtorDropdownDataAdapter = (data: ApiCodebtor[]) => {
  return data.map((codebtor) => ({
    name: codebtor.name,
    code: String(codebtor.idCoDebtor),
  }));
};
export const propertiesDropdownDataAdapter = (data: ApiProperty[]) => {
  return data.map((property) => ({
    name: property.nameProperty,
    code: String(property.idProperty),
  }));
};

export const dataTableTenantAdapter = (data: ApiTenant[]) => {
  return data.sort((a, b) => b.idTenant - a.idTenant);
};

export const dataTableObservationAdapter = (
  data: ApiObservation[]
): ApiObservation[] => {
  return data.sort((a, b) => b.idObservation - a.idObservation);
};
