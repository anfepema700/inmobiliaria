import { ApiBasicResponse } from "../../../models/apiBasicResponse.model";
import { ApiCodebtor, CodebtorForm } from "../model/codebtor.model";
import axios from "axios";
export const getCodebtorDataService = async (): Promise<ApiCodebtor[]> => {
  const baseUrl = process.env.REACT_APP_API_HOST;
  const codebtor = await axios.get(`${baseUrl}co-debtors/get-all-co-debtors`);
  return codebtor.data.data;
};
export const createCodebtorService = async (
  createCodebtorDto: CodebtorForm
): Promise<ApiBasicResponse> => {
  const baseUrl = process.env.REACT_APP_API_HOST;
  const codebtor = await axios.post(
    `${baseUrl}co-debtors/create-co-debtor`,
    createCodebtorDto
  );
  return codebtor.data;
};
