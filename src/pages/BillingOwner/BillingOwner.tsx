import { useEffect, useState } from "react";
import { ApiOwners } from "../AdminOwners/models/owners.model";
import { getAllOwnersService } from "../AdminOwners/services/owners.service";
import FormBillingOwner from "./components/FormBillingOwner";
import TableBilingOwner from "./components/TableBilingOwner";
import {
  getAllBillingOwnerService,
  getDataOwnerByIdService,
} from "./services/billingOwner.service";
import { ApiBillingOwner } from "./models/billingOwner.model";
import { CustomMessageProps } from "../../components/MessageComponent/models/messageComponent.model";
import MessageComponent from "../../components/MessageComponent/MessageComponent";
import { Dialog } from "primereact/dialog";
import ResumeOwners from "../AdminOwners/components/ResumeOwners";
import { get } from "http";

function BillingOwner(): JSX.Element {
  const [dataOwners, setDataOwners] = useState<ApiOwners[]>([]);
  const [dataBillingOwners, setDataBillingOwners] = useState<ApiBillingOwner[]>(
    []
  );
  const [showResumeOwner, setShowResumeOwner] = useState(false);
  const [apiResponse, setApiResponse] = useState<CustomMessageProps>({
    severity: "error",
    message: "",
  });
  const [dataOwnerById, setDataOwnerById] = useState<ApiOwners>();
  const [dataBillingOwnerRow, setDataBillingOwnerRow] =
    useState<ApiBillingOwner>();
  const getAllDataOwners = async () => {
    try {
      const getAllDataOwners = await getAllOwnersService();
      if (getAllDataOwners.length > 0) {
        setDataOwners(getAllDataOwners);
      } else {
        setApiResponse({
          severity: "error",
          message: "No se encontraron propietarios",
        });
      }
    } catch (error) {
      setApiResponse({
        severity: "error",
        message: "Error al obtener propietarios",
      });
    }
  };

  const getAllBillingOwners = async () => {
    try {
      const getAllBillingOwners = await getAllBillingOwnerService();
      if (getAllBillingOwners.length > 0) {
        setDataBillingOwners(getAllBillingOwners);
      }
    } catch (error) {}
  };
  const getOwnerDataById = async (idOwner: number) => {
    try {
      const getOwnerDataByIdResponse = await getDataOwnerByIdService(idOwner);
      if (getOwnerDataByIdResponse) {
        setDataOwnerById(getOwnerDataByIdResponse);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAllDataOwners();
    getAllBillingOwners();
  }, []);
  return (
    <div className="grid ml-4 mr-4">
      <h1 className="col-12 text-center">
        Administración de Cobros Propietarios
      </h1>
      <FormBillingOwner
        dataOwners={dataOwners}
        getAllBillingOwners={getAllBillingOwners}
        setApiResponse={setApiResponse}
        dataBillingOwnerRow={dataBillingOwnerRow}
      />
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
      <div className="col-12">
        <TableBilingOwner
          dataBillingOwners={dataBillingOwners}
          setDataBillingOwnerRow={setDataBillingOwnerRow}
          setShowResumeOwner={setShowResumeOwner}
          getOwnerDataById={getOwnerDataById}
        />
      </div>
      {dataOwnerById && (
        <Dialog
          header="Resumen Propietario"
          visible={showResumeOwner}
          onHide={() => setShowResumeOwner(false)}
          maximizable
          className="col-12 md:col-6 sm:col-12"
        >
          <ResumeOwners ownerData={dataOwnerById} />
        </Dialog>
      )}
    </div>
  );
}

export default BillingOwner;
