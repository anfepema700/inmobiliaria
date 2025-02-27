import { ApiOwners } from "../../AdminOwners/models/owners.model";
import { ApiTenant } from "../../AdminTenant/models/tenant.model";
import { ApiContract } from "../models/adminContract.model";

export const dropdownTenantsAdapter = (data: ApiTenant[]) => {
  return data.map((tenant) => ({
    name: String(tenant.name),
    code: String(tenant.idTenant),
  }));
};

export const dropdownOwnersAdapter = (data: ApiOwners[]) => {
  return data.map((tenant) => ({
    name: String(tenant.name),
    code: String(tenant.idOwner),
  }));
};
export const dataTableContractAdapter = (data: ApiContract[]) => {
  return data.sort((a, b) => b.idContract - a.idContract);
};
