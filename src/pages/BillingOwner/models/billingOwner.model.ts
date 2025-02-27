import { ApiOwners } from "../../AdminOwners/models/owners.model";
import { ApiProperty } from "../../AdminProperty/models/adminProperty.model";

export interface BillingOwnerFormData {
  idOwner: string;
  comissionPercentage: string;
  comissionValue: string;
  fourPerThousand: string;
  valueToPayment: string;
  idProperty: string;
  discharge: string;
  datePayment: string | Date;
  observation: string;
}
export interface ApiBillingOwner {
  idBillingOwner: number;
  comissionPercentage: string;
  comissionValue: string;
  fourPerThousand: string;
  valueToPayment: string;
  discharge: string;
  datePayment: Date;
  observation: string;
  property: ApiProperty;
  owner: ApiOwners;
}
