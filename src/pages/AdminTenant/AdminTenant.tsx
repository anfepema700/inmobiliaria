import { useEffect, useState } from "react";
import FormTenant from "./components/FormTenant";
import { Dialog } from "primereact/dialog";
import FormObservationTenant from "./components/FormObservationTenant";
import { Button } from "primereact/button";
import { DropdownData } from "../../components";
import { getCodebtorDataService } from "../AdminCoDebtor/services/codebtor.service";
import {
  codebtorDropdownDataAdapter,
  dataTableTenantAdapter,
  propertiesDropdownDataAdapter,
} from "./adapters/tenant.adapter";
import { getPropertyDataService } from "../AdminProperty/services/property.service";
import { ApiTenant } from "./models/tenant.model";
import TableTenant from "./components/TableTenant";
import { getAllTenantsService } from "./services/tenant.service";
import TableObservationsTenant from "./components/TableObservationsTenant";
import MessageComponent from "../../components/MessageComponent/MessageComponent";
import { CustomMessageProps } from "../../components/MessageComponent/models/messageComponent.model";

function AdminTenant(): JSX.Element {
  const [apiResponse, setApiResponse] = useState<CustomMessageProps>({
    severity: "error",
    message: "",
  });
  const [visibleObservationForm, setVisibleObservationForm] =
    useState<boolean>(false);
  const [codebtorDataDropdown, setCodebtorDataDropdown] = useState<
    DropdownData[]
  >([]);
  const [propertyDataDropdown, setPropertyDataDropdown] = useState<
    DropdownData[]
  >([]);
  const [dataRowTenant, setDataRowTenant] = useState<ApiTenant>();
  const [dataTableTenant, setDataTableTenant] = useState<ApiTenant[]>([]);
  const getAllCodebtor = async () => {
    try {
      const getAllCodebtor = await getCodebtorDataService();
      if (getAllCodebtor.length > 0) {
        setCodebtorDataDropdown(codebtorDropdownDataAdapter(getAllCodebtor));
      }
    } catch (error) {}
  };
  const getAllProperties = async () => {
    try {
      const getAllProperties = await getPropertyDataService();
      if (getAllProperties.length > 0) {
        setPropertyDataDropdown(
          propertiesDropdownDataAdapter(getAllProperties)
        );
      }
    } catch (error) {}
  };
  const getAllTenants = async () => {
    try {
      const getAllTenants = await getAllTenantsService();
      if (getAllTenants.length > 0) {
        setDataTableTenant(dataTableTenantAdapter(getAllTenants));
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAllCodebtor();
    getAllProperties();
    getAllTenants();
  }, []);

  return (
    <div className="grid mr-4 ml-4">
      <h1 className="col-12 text-center">Administración de Inquilinos</h1>
      <div className="col-12 md:col-12 sm:col-12 ml-4 mr-4">
        <FormTenant
          codebtorDropdown={codebtorDataDropdown}
          propertiesDropdown={propertyDataDropdown}
          dataRowTenant={dataRowTenant}
          getAllTenants={getAllTenants}
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
      <div className="col-12">
        <TableTenant
          data={dataTableTenant}
          setDataRowTenant={setDataRowTenant}
          setVisibleObservationForm={setVisibleObservationForm}
        />
      </div>
      {dataRowTenant && (
        <>
          <Dialog
            header={`Agregar observación ${dataRowTenant.name}`}
            visible={visibleObservationForm}
            style={{ width: "50vw" }}
            onHide={() => {
              if (!visibleObservationForm) return;
              setVisibleObservationForm(false);
            }}
          >
            <>
              <FormObservationTenant
                idTenant={+dataRowTenant.idTenant}
                setVisibleObservationForm={setVisibleObservationForm}
                getAllTenants={getAllTenants}
                setApiResponse={setApiResponse}
              />
              {dataRowTenant.observations && (
                <TableObservationsTenant data={dataRowTenant.observations} />
              )}
            </>
          </Dialog>
        </>
      )}
    </div>
  );
}

export default AdminTenant;
