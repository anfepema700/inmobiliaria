import { DropdownData } from "../../../components";
import { ApiProperty } from "../../AdminProperty/models/adminProperty.model";
import { ApiOwners } from "../models/owners.model";

export const dataTableOwnersAdapter = (data: ApiOwners[]) => {
  return data.sort((a, b) => b.idOwner - a.idOwner);
};
export const propertiesDropdownDataAdapter = (
  data: ApiProperty[]
): DropdownData[] => {
  return data.map((property) => ({
    name: property.nameProperty,
    code: String(property.idProperty),
  }));
};
