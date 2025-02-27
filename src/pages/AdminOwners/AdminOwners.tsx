import FormOwners from "./components/FormOwners";
import { getAllOwnersService } from "./services/owners.service";
import { ApiOwners } from "./models/owners.model";
import { useEffect, useState } from "react";
import { dataTableOwnersAdapter } from "./adapters/owners.adapter";
import TableOwners from "./components/TableOwners";
import FormOwnersObservation from "./components/FormOwnersObservation";
import { Dialog } from "primereact/dialog";
import TableOwnersObservations from "./components/TableOwnersObservations";

import MessageComponent from "../../components/MessageComponent/MessageComponent";
import { CustomMessageProps } from "../../components/MessageComponent/models/messageComponent.model";
import ResumeOwners from "./components/ResumeOwners";

function AdminProperties(): JSX.Element {
  const [dataOwners, setDataOwners] = useState<ApiOwners[]>([]);
  const [dataOwnersRow, setDataOwnersRow] = useState<ApiOwners>();
  const [visibleFormObservation, setVisibleFormObservation] = useState(false);
  const [visibleResumeOwnerData, setVisibleResumeOwnerData] = useState(false);
  const [apiResponse, setApiResponse] = useState<CustomMessageProps>({
    severity: "error",
    message: "",
  });
  const getAllOwners = async () => {
    try {
      const getAllOwners = await getAllOwnersService();
      if (getAllOwners.length > 0) {
        setDataOwners(dataTableOwnersAdapter(getAllOwners));
      }
    } catch (error) {
      setApiResponse({
        severity: "error",
        message: "Error al obtener propietarios",
      });
    }
  };

  useEffect(() => {
    getAllOwners();
  }, []);
  return (
    <div className="grid mr-8">
      <h1 className="col-12 text-center">Administración de Propietarios</h1>
      <div className="col-12 ml-8 mt-2">
        <FormOwners
          ownerDataRow={dataOwnersRow}
          getAllOwners={getAllOwners}
          setApiResponse={setApiResponse}
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
      <div className="col-12 md:col-12 sm:col-12 ml-8 mr-2">
        <TableOwners
          data={dataOwners}
          setDataOwnersRow={setDataOwnersRow}
          setVisibleFormObservation={setVisibleFormObservation}
          setVisibleResumeOwnerData={setVisibleResumeOwnerData}
        />
      </div>
      {dataOwnersRow && (
        <>
          <Dialog
            header={`Observación ${dataOwnersRow.name}`}
            visible={visibleFormObservation}
            onHide={() => setVisibleFormObservation(false)}
            style={{ width: "90vw" }}
          >
            <FormOwnersObservation
              getAllOwners={getAllOwners}
              setVisibleFormObservation={setVisibleFormObservation}
              dataOwnersRow={dataOwnersRow}
              setApiResponse={setApiResponse}
            />
            <TableOwnersObservations data={dataOwnersRow.observations} />
          </Dialog>
          <Dialog
            header={`Resumen ${dataOwnersRow.name}`}
            visible={visibleResumeOwnerData}
            onHide={() => setVisibleResumeOwnerData(false)}
            style={{ width: "90vw" }}
          >
            <ResumeOwners ownerData={dataOwnersRow} />
          </Dialog>
        </>
      )}
    </div>
  );
}

export default AdminProperties;
