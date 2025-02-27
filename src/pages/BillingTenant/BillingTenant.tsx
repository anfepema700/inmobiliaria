import { useEffect, useState } from "react";
import { ApiTenant } from "../AdminTenant/models/tenant.model";
import FormBillingTenant from "./components/FormBillingTenant";
import FormDataBillingTenant from "./components/FormBillingTenant";
import { ApiProperty } from "../AdminProperty/models/adminProperty.model";
import { getAllTenantsService } from "../AdminTenant/services/tenant.service";
import { getPropertyDataService } from "../AdminProperty/services/property.service";
import TableBillingTenant from "./components/TableBillingTenant";
import { CustomMessageProps } from "../../components/MessageComponent/models/messageComponent.model";
import MessageComponent from "../../components/MessageComponent/MessageComponent";
import { getBillingTenantService } from "./service/billingTenant.service";
import { ApiBillingTenant } from "./models/billingTenant.model";
import { dataBillingTenantAdapter } from "./adapters/billingTenant.adapter";

function BillingTenant(): JSX.Element {
  const [tenantData, setTenantData] = useState<ApiTenant[]>([]);
  const [dataProperty, setDataProperty] = useState<ApiProperty[]>([]);
  const [apiResponse, setApiResponse] = useState<CustomMessageProps>({
    severity: "error",
    message: "",
  });
  const [dataBillingTenant, setDataBillingTenant] = useState<
    ApiBillingTenant[]
  >([]);
  const [dataBillingTenantRow, setDataBillingTenantRow] =
    useState<ApiBillingTenant>();
  const getTenantData = async () => {
    try {
      const getAllTenants = await getAllTenantsService();
      if (getAllTenants.length > 0) {
        setTenantData(getAllTenants);
      } else {
        setApiResponse({
          severity: "error",
          message: "No se encontraron inquilinos",
        });
      }
    } catch (error) {
      setApiResponse({
        severity: "error",
        message: "Error al obtener inquilinos",
      });
    }
  };

  const getPropertyData = async () => {
    try {
      const getAllProperties = await getPropertyDataService();
      if (getAllProperties.length > 0) {
        setDataProperty(getAllProperties);
      }
    } catch (error) {
      setApiResponse({
        severity: "error",
        message: "Error al obtener propiedades",
      });
    }
  };
  const getAllBillingData = async () => {
    try {
      const response = await getBillingTenantService();
      if (response) {
        setDataBillingTenant(response);
      }
    } catch (error) {
      setApiResponse({
        severity: "error",
        message: "Error al obtener cobros",
      });
    }
  };
  useEffect(() => {
    getTenantData();
    getPropertyData();
    getAllBillingData();
  }, []);

  return (
    <div className="grid ml-4 mr-4">
      <h1 className="col-12 text-center">
        Administración de Cobros Inquilinos
      </h1>
      <div className="grid ml-4 mr-4">
        <FormBillingTenant
          setApiResponse={setApiResponse}
          tenantData={tenantData}
          dataProperty={dataProperty}
          dataBillingTenantRow={dataBillingTenantRow}
          getAllBillingData={getAllBillingData}
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
        <TableBillingTenant
          setDataBillingTenantRow={setDataBillingTenantRow}
          data={dataBillingTenantAdapter(dataBillingTenant)}
        />
      </div>
    </div>
  );
}

export default BillingTenant;
