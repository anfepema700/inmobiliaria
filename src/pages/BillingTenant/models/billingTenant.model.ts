import { ApiProperty } from "../../AdminProperty/models/adminProperty.model";
import { ApiTenant } from "../../AdminTenant/models/tenant.model";

export interface FormDataBillingTenant {
  idTenant: string;
  canon: string;
  dayBilling: string;
  idProperty: string;
  bill: string;
  datePayment: Date | string;
  paymentReceiptNumber: string;
  observation: string;
}
export interface ApiBillingTenant {
  idBillingTenant: number;
  canon: string;
  dayBilling: string;
  bill: string;
  datePayment: string | Date;
  paymentReceiptNumber: string;
  observation: string;
  property: ApiProperty;
  tenant: ApiTenant;
}
