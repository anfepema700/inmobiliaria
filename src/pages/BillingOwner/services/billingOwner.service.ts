import axios from "axios";
import { ApiBasicResponse } from "../../../models/apiBasicResponse.model";
import {
  ApiBillingOwner,
  BillingOwnerFormData,
} from "../models/billingOwner.model";
import { ApiOwners } from "../../AdminOwners/models/owners.model";

export const createBillingOwnerService = async (
  data: BillingOwnerFormData
): Promise<ApiBasicResponse> => {
  const baseUrl = process.env.REACT_APP_API_HOST;
  const billingOwner = await axios.post(
    `${baseUrl}billing-owner/create-billing-owner`,
    data
  );
  return billingOwner.data;
};
export const getAllBillingOwnerService = async (): Promise<
  ApiBillingOwner[]
> => {
  const baseUrl = process.env.REACT_APP_API_HOST;
  const billingOwner = await axios.get(
    `${baseUrl}billing-owner/get-all-billing-owner`
  );
  return billingOwner.data.data;
};
export const getDataOwnerByIdService = async (
  idOwner: number
): Promise<ApiOwners> => {
  const baseUrl = process.env.REACT_APP_API_HOST;
  const billingOwner = await axios.get(
    `${baseUrl}owners/get-owner-by-id/${idOwner}`
  );
  return billingOwner.data.data;
};
