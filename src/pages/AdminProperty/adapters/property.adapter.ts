import { DropdownData } from "../../../components";
import { ApiOwners } from "../../AdminOwners/models/owners.model";
import { ApiProperty } from "../models/adminProperty.model";

export const dataTablePropertyAdapter = (data: ApiProperty[]) => {
  return data.sort((a, b) => b.idProperty - a.idProperty);
};
export const ownersDropdownDataAdapter = (
  data: ApiOwners[]
): DropdownData[] => {
  return data.map((owner) => ({
    name: owner.name,
    code: String(owner.idOwner),
  }));
};
