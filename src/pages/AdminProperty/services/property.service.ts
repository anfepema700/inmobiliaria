import axios from "axios";
import { ApiProperty, PropertyForm } from "../models/adminProperty.model";
import { ApiBasicResponse } from "../../../models/apiBasicResponse.model";

export const getPropertyDataService = async (): Promise<ApiProperty[]> => {
  const baseUrl = process.env.REACT_APP_API_HOST;
  const property = await axios.get(`${baseUrl}properties/get-properties`);
  return property.data.data;
};

export const createPropertyService = async (
  createProperty: PropertyForm
): Promise<ApiBasicResponse> => {
  const baseUrl = process.env.REACT_APP_API_HOST;
  const property = await axios.post(
    `${baseUrl}properties/create-properties`,
    createProperty
  );
  return property.data;
};

export const updatePropertyService = async (
  updatePropertyDto: PropertyForm
): Promise<ApiBasicResponse> => {
  const baseUrl = process.env.REACT_APP_API_HOST;
  const property = await axios.post(
    `${baseUrl}properties/create-properties`,
    updatePropertyDto
  );
  return property.data;
};
