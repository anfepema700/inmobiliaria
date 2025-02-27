import { useEffect, useState } from "react";
import FormCodebtor from "./components/FormCodebtor";
import { getCodebtorDataService } from "./services/codebtor.service";
import { ApiCodebtor } from "./model/codebtor.model";
import TableCodebtor from "./components/TableCodebtor";
import { dataTableCodebtorAdapter } from "./adapters/adminCodebtor.adapter";
import { Divider } from "primereact/divider";
import MessageComponent from "../../components/MessageComponent/MessageComponent";
import { CustomMessageProps } from "../../components/MessageComponent/models/messageComponent.model";

function AdminCoDebtor(): JSX.Element {
  const [codebtor, setCodebtor] = useState<ApiCodebtor[]>([]);
  const [apiResponse, setApiResponse] = useState<CustomMessageProps>({
    severity: "error",
    message: "",
  });
  const [coDebtorRow, setCoDebtorRow] = useState<ApiCodebtor>();
  const getAllCodebtor = async () => {
    try {
      const getAllCodebtor = await getCodebtorDataService();
      if (getAllCodebtor.length > 0) {
        setCodebtor(dataTableCodebtorAdapter(getAllCodebtor));
      }
    } catch (error) {}
  };
  useEffect(() => {
    getAllCodebtor();
  }, []);
  return (
    <div className="grid ml-4 mr-4">
      <h1 className="col-12 text-center">Administración codeudores</h1>
      <div className="col-12 md:col-12 sm:col-12">
        <FormCodebtor
          getAllCodebtor={getAllCodebtor}
          setApiResponse={setApiResponse}
          coDebtorRow={coDebtorRow}
        />
      </div>
      {apiResponse.message && (
        <div className="text-center col-12">
          <MessageComponent
            message={apiResponse.message}
            severity={apiResponse.severity}
            onClose={() => {
              setApiResponse({
                severity: "error",
                message: "",
              });
            }}
          />
        </div>
      )}
      <Divider layout="vertical" />
      <div className="col-12 md:col-12 sm:col-12">
        <TableCodebtor data={codebtor} setCoDebtorRow={setCoDebtorRow} />
      </div>
    </div>
  );
}

export default AdminCoDebtor;
