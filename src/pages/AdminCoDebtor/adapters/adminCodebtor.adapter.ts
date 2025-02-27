import { ApiCodebtor } from "../model/codebtor.model";

export const dataTableCodebtorAdapter = (data: ApiCodebtor[]) => {
  return data.sort((a, b) => b.idCoDebtor - a.idCoDebtor);
};
