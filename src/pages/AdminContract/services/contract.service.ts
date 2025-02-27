import axios from "axios";
import { ApiContract, ContractForm } from "../models/adminContract.model";
import { ApiBasicResponse } from "../../../models/apiBasicResponse.model";

export const getAllContractsService = async (): Promise<ApiContract[]> => {
  const baseUrl = process.env.REACT_APP_API_HOST;
  const contracts = await axios.get(`${baseUrl}contracts/get-contracts`);
  return contracts.data.data;
};
export const createContractService = async (
  createContractDto: ContractForm
): Promise<ApiBasicResponse> => {
  const baseUrl = process.env.REACT_APP_API_HOST;
  const contracts = await axios.post(
    `${baseUrl}contracts/create-contract`,
    createContractDto
  );
  return contracts.data;
};
