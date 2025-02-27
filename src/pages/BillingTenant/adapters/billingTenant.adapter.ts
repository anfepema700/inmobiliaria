import { DropdownData } from "../../../components";
import {
  adjustDate,
  adjustDateForCalendar,
  formatDate,
} from "../../../utilities/dateFunctions";
import { ApiProperty } from "../../AdminProperty/models/adminProperty.model";
import { ApiTenant } from "../../AdminTenant/models/tenant.model";
import { ApiBillingTenant } from "../models/billingTenant.model";

export const dataTenantDropdownAdapter = (
  data: ApiTenant[]
): DropdownData[] => {
  return data?.map((tenant) => {
    return {
      name: tenant.name,
      code: String(tenant.idTenant),
    };
  });
};
export const dataPropertyDropdownAdapter = (
  data: ApiProperty[]
): DropdownData[] => {
  return data?.map((property) => {
    return {
      name: property.nameProperty,
      code: String(property.idProperty),
    };
  });
};
export const dataBillingTenantAdapter = (
  data: ApiBillingTenant[]
): ApiBillingTenant[] => {
  return data?.map((data) => {
    return {
      ...data,
      datePayment: data.datePayment,
    };
  });
};
