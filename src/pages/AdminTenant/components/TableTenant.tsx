import { Button } from "primereact/button";
import DynamicDataTable, {
  ColumnConfig,
} from "../../../components/DynamicDataTable/DynamicDataTable";
import { ApiTenant } from "../models/tenant.model";
import { ApiCodebtor } from "../../AdminCoDebtor/model/codebtor.model";
import { Badge } from "primereact/badge";
import { ApiContract } from "../../AdminContract/models/adminContract.model";

interface TableTenantProps {
  setDataRowTenant: (data: ApiTenant) => void;
  data: ApiTenant[];
  setVisibleObservationForm: (visible: boolean) => void;
}
function TableTenant({
  data,
  setDataRowTenant,
  setVisibleObservationForm,
}: TableTenantProps) {
  const columns: ColumnConfig[] = [
    {
      field: "document",
      header: "Documento",
    },
    {
      field: "name",
      header: "Nombre",
    },
    {
      field: "policyNumber",
      header: "Poliza",
    },
    {
      field: "phone",
      header: "Teléfono",
    },
    {
      field: "email",
      header: "Correo",
    },
    {
      field: "dayBilling",
      header: "Fecha de facturación",
    },

    {
      field: "coDebtors",
      header: "Codeudores",
      body(op) {
        const codebtors: ApiCodebtor[] = op.coDebtors;
        return (
          <>
            {codebtors.length > 0 ? (
              codebtors.map((codebtor, index) => {
                return (
                  <p className="m-1 bg-gray-100">{`${index + 1}: ${
                    codebtor.name
                  }`}</p>
                );
              })
            ) : (
              <p className="m-1 bg-red-200">Sin codeudores</p>
            )}
          </>
        );
      },
    },
    {
      field: "property.nameProperty",
      header: "Propiedad",
    },
    {
      field: "contract",
      header: "Contrato",
      body(op) {
        const contract: ApiContract = op.contract;
        return (
          <>
            {contract ? (
              <p className="m-1 bg-green-200">{contract.numberContract}</p>
            ) : (
              <p className="m-1 bg-red-200">Sin contrato</p>
            )}
          </>
        );
      },
    },
    {
      field: "actions",
      header: "Acciones",

      body(op) {
        return (
          <div className="grid">
            <Button
              type="button"
              icon="pi pi-pencil"
              tooltip="Editar"
              className="mr-2"
              severity="warning"
              onClick={() => {
                setDataRowTenant(op);
              }}
            ></Button>

            <Button
              tooltip="Observación"
              type="button"
              icon="pi pi-plus-circle"
              className="mr-2"
              severity="info"
              onClick={() => {
                setVisibleObservationForm(true);
                setDataRowTenant(op);
              }}
            ></Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <DynamicDataTable paginator filter columns={columns} data={data} />
    </div>
  );
}

export default TableTenant;
