import { ApiContract } from "../../AdminContract/models/adminContract.model";
import { ApiProperty } from "../../AdminProperty/models/adminProperty.model";
import { ApiObservation } from "../../AdminTenant/models/tenant.model";

export interface OwnersForm {
  idOwner?: number;
  document: string;
  name: string;
  phone: string;
  address: string;
  email: string;
  percentageCommission: string;
  accountNumber: string;
  accountType: string;
  bank: string;
  fourPerThousand: boolean;
  fourPerThousandValue: number;
}
export interface ApiOwners {
  idOwner: number;
  document: string;
  name: string;
  phone: string;
  address: string;
  email: string;
  percentageCommission: string;
  bank: string;
  accountType: string;
  accountNumber: string;
  fourPerThousand: boolean;
  fourPerThousandValue: number;
  properties: ApiProperty[];
  contract: ApiContract[];
  observations: ApiObservation[];
}
export interface OwnersObservationForm {
  idOwner?: number;
  observation: string;
}
