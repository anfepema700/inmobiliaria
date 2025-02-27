import { useEffect, useState } from "react";
import FormProperty from "./components/FormProperty";
import { ApiProperty } from "./models/adminProperty.model";
import { getPropertyDataService } from "./services/property.service";
import TableProperty from "./components/TableProperty";
import { getAllOwnersService } from "../AdminOwners/services/owners.service";
import { DropdownData } from "../../components";
import { ownersDropdownDataAdapter } from "./adapters/property.adapter";
import MessageComponent from "../../components/MessageComponent/MessageComponent";
import { CustomMessageProps } from "../../components/MessageComponent/models/messageComponent.model";

function AdminProperty(): JSX.Element {
  const [apiDataProperties, setApiDataProperties] = useState<ApiProperty[]>([]);
  const [dataOwners, setDataOwners] = useState<DropdownData[]>([]);
  const [rowDataProperty, setRowDataProperty] = useState<ApiProperty>();
  const [apiResponse, setApiResponse] = useState<CustomMessageProps>({
    severity: "error",
    message: "",
  });
  const getAllPropertys = async () => {
    try {
      const getAllProperties = await getPropertyDataService();
      if (getAllProperties.length > 0) {
        setApiDataProperties(getAllProperties);
      }
    } catch (error) {}
  };

  const getAllOwners = async () => {
    try {
      const getAllOwners = await getAllOwnersService();
      if (getAllOwners.length > 0) {
        setDataOwners(ownersDropdownDataAdapter(getAllOwners));
      }
    } catch (error) {}
  };
  useEffect(() => {
    getAllPropertys();
    getAllOwners();
  }, []);

  return (
    <div className="grid mr-8 ml-8">
      <h1 className="col-12 text-center">Administración de Propiedades</h1>
      <div className="col-12">
        <FormProperty
          dropdownOwner={dataOwners}
          getAllProperties={getAllPropertys}
          rowDataProperty={rowDataProperty}
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
        <TableProperty
          data={apiDataProperties}
          setRowDataProperty={setRowDataProperty}
        />
      </div>
    </div>
  );
}

export default AdminProperty;
