import axios from "axios";
import {
  ApiOwners,
  OwnersForm,
  OwnersObservationForm,
} from "../models/owners.model";
import { ApiBasicResponse } from "../../../models/apiBasicResponse.model";

export const getAllOwnersService = async (): Promise<ApiOwners[]> => {
  const baseUrl = process.env.REACT_APP_API_HOST;
  const owners = await axios.get(`${baseUrl}owners/get-all-owners`);
  return owners.data.data;
};
export const createOwnersService = async (
  createOwnersDto: OwnersForm
): Promise<ApiBasicResponse> => {
  const baseUrl = process.env.REACT_APP_API_HOST;
  const owners = await axios.post(
    `${baseUrl}owners/create-owner`,
    createOwnersDto
  );
  return owners.data;
};
export const updateOwnersService = async (
  updateOwnersDto: OwnersForm
): Promise<ApiBasicResponse> => {
  const baseUrl = process.env.REACT_APP_API_HOST;
  const owners = await axios.post(
    `${baseUrl}owners/update-owner`,
    updateOwnersDto
  );
  return owners.data;
};

export const createObservationOwnerService = async (
  createObservationOwnerDto: OwnersObservationForm
): Promise<ApiBasicResponse> => {
  const baseUrl = process.env.REACT_APP_API_HOST;
  const owners = await axios.post(
    `${baseUrl}owners-observations/create-owner-observation`,
    createObservationOwnerDto
  );
  return owners.data;
};
