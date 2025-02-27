import axios from "axios";
import { ApiBasicResponse } from "../../../models/apiBasicResponse.model";
import {
  ApiBillingTenant,
  FormDataBillingTenant,
} from "../models/billingTenant.model";

export const createBillingTenantService = async (
  formDataBillingTenant: FormDataBillingTenant
): Promise<ApiBasicResponse> => {
  const baseUrl = process.env.REACT_APP_API_HOST;
  const billingTenant = await axios.post(
    `${baseUrl}billing-tenant/create-billing-tenant`,
    formDataBillingTenant
  );
  return billingTenant.data;
};
export const getBillingTenantService = async (): Promise<
  ApiBillingTenant[]
> => {
  const baseUrl = process.env.REACT_APP_API_HOST;
  const billingTenant = await axios.get(
    `${baseUrl}billing-tenant/get-billing-tenant`
  );
  return billingTenant.data.data;
};
