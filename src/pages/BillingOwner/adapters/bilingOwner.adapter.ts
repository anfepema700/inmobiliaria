import { DropdownData } from "../../../components";
import { ApiOwners } from "../../AdminOwners/models/owners.model";
import { ApiProperty } from "../../AdminProperty/models/adminProperty.model";

export const dropdownDataBillingOwnerAdapter = (
  data: ApiOwners[]
): DropdownData[] => {
  return data.map((owner) => ({
    name: owner.name,
    code: String(owner.idOwner),
  }));
};
export const dropdownPropertyBillingOwnerAdapter = (
  data: ApiProperty[]
): DropdownData[] => {
  return data.map((property) => ({
    name: property.nameProperty,
    code: String(property.idProperty),
  }));
};
