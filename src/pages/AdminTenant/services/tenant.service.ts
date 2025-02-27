import axios from "axios";
import {
  ApiTenant,
  TenantForm,
  TenantObservationForm,
} from "../models/tenant.model";
import { ApiBasicResponse } from "../../../models/apiBasicResponse.model";

export const getAllTenantsService = async (): Promise<ApiTenant[]> => {
  const baseUrl = process.env.REACT_APP_API_HOST;
  const tenants = await axios.get(`${baseUrl}tenant/get-tenant`);
  return tenants.data.data;
};
export const createTenantService = async (
  createTenant: TenantForm
): Promise<ApiBasicResponse> => {
  const baseUrl = process.env.REACT_APP_API_HOST;
  const tenant = await axios.post(
    `${baseUrl}tenant/create-tenant`,
    createTenant
  );
  return tenant.data;
};
export const createObservationTenantService = async (
  createObservationTenantDto: TenantObservationForm
): Promise<ApiBasicResponse> => {
  const baseUrl = process.env.REACT_APP_API_HOST;
  const tenant = await axios.post(
    `${baseUrl}tenant-observations/create-tenant-observations`,
    createObservationTenantDto
  );
  return tenant.data;
};
