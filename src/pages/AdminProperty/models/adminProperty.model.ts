import { ApiOwners } from "../../AdminOwners/models/owners.model";

export interface PropertyForm {
  idProperty?: number;
  nameProperty: string;
  canon: string;
  administrationPayment: string;
  address: string;
  idOwner: string;
}

export interface ApiProperty {
  idProperty: number;
  nameProperty: string;
  canon: string;
  administrationPayment: string;
  address: string;
  owner: ApiOwners;
}
