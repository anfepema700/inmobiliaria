import { useEffect, useState } from "react";
import { getAllTenantsService } from "../AdminTenant/services/tenant.service";
import FormContract from "./components/FormContract";
import { DropdownData } from "../../components";
import {
  dataTableContractAdapter,
  dropdownOwnersAdapter,
  dropdownTenantsAdapter,
} from "./adapters/contract.adapter";
import { getAllOwnersService } from "../AdminOwners/services/owners.service";
import { ApiContract } from "./models/adminContract.model";
import { getAllContractsService } from "./services/contract.service";
import TableContract from "./components/TableContract";
import { CustomMessageProps } from "../../components/MessageComponent/models/messageComponent.model";
import MessageComponent from "../../components/MessageComponent/MessageComponent";

function AdminContract(): JSX.Element {
  const [apiResponse, setApiResponse] = useState<CustomMessageProps>({
    severity: "error",
    message: "",
  });
  const [dataDropdownTenant, setDataDropdownTenant] = useState<DropdownData[]>(
    []
  );
  const [dataDropdownOwner, setDataDropdownOwner] = useState<DropdownData[]>(
    []
  );
  const [dataContractRow, setDataContractRow] = useState<ApiContract>();
  const [dataContract, setDataContract] = useState<ApiContract[]>([]);
  const getAllTenants = async () => {
    try {
      const getAllTenants = await getAllTenantsService();
      if (getAllTenants.length > 0) {
        setDataDropdownTenant(dropdownTenantsAdapter(getAllTenants));
      }
    } catch (error) {}
  };
  const getAllOwners = async () => {
    try {
      const response = await getAllOwnersService();
      if (response) {
        setDataDropdownOwner(dropdownOwnersAdapter(response));
      }
    } catch (error) {
      setApiResponse({
        severity: "error",
        message: "Error al obtener propietarios",
      });
    }
  };

  const getAllContracts = async () => {
    try {
      const getAllContracts = await getAllContractsService();
      if (getAllContracts.length > 0) {
        setDataContract(dataTableContractAdapter(getAllContracts));
      }
    } catch (error) {
      setApiResponse({
        severity: "error",
        message: "Error al obtener contratos",
      });
    }
  };
  useEffect(() => {
    getAllContracts();
    getAllTenants();
    getAllOwners();
  }, []);

  return (
    <div className="grid mr-8 ml-8">
      <h1 className="col-12 text-center">Administración de Contratos</h1>
      <div className="col-12 md:col-12 sm:col-12">
        <FormContract
          dataDropdownOwner={dataDropdownOwner}
          dataDropdownTenant={dataDropdownTenant}
          getAllContracts={getAllContracts}
          setApiResponse={setApiResponse}
          dataContractRow={dataContractRow}
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
        <TableContract
          dataTableContract={dataContract}
          setDataContractRow={setDataContractRow}
        />
      </div>
    </div>
  );
}

export default AdminContract;
