import { ApiOwners } from "../../AdminOwners/models/owners.model";
import { ApiTenant } from "../../AdminTenant/models/tenant.model";

export interface ContractForm {
  increment: string;
  numberContract: string;
  dateStart: Date | null | string;
  dateEnd: Date | null | string;
  dateNotification: Date | null | string;
  idOwner: string;
  idTenant: string;
}
export interface ApiContract {
  idContract: number;
  increment: string;
  numberContract: string;
  dateStart: Date;
  dateEnd: Date;
  dateNotification: Date;
  owner: ApiOwners;
  tenant: ApiTenant;
}
