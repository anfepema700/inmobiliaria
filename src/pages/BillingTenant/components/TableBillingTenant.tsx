import { Button } from "primereact/button";
import DynamicDataTable, {
  ColumnConfig,
} from "../../../components/DynamicDataTable/DynamicDataTable";
import { ApiBillingTenant } from "../models/billingTenant.model";

interface TableBillingTenantProps {
  data: ApiBillingTenant[];
  setDataBillingTenantRow: (data: ApiBillingTenant) => void;
}
function TableBillingTenant({
  data,
  setDataBillingTenantRow,
}: TableBillingTenantProps): JSX.Element {
  const columns: ColumnConfig[] = [
    {
      field: "idBillingTenant",
      header: "id",
    },
    {
      field: "canon",
      header: "Fecha",
    },
    {
      field: "dayBilling",
      header: "Monto",
    },
    {
      field: "bill",
      header: "Estado",
    },
    {
      field: "datePayment",
      header: "Fecha de pago",
    },
    {
      field: "paymentReceiptNumber",
      header: "N° de recibo",
    },
    {
      field: "observation",
      header: "Observación",
    },
    {
      field: "property.nameProperty",
      header: "Inmueble",
    },

    {
      field: "tenant.name",
      header: "Inquilino",
    },
    {
      field: "actions",
      header: "Acciones",
      body: (op) => {
        return (
          <>
            <Button
              icon="pi pi-pencil"
              tooltip="Editar"
              tooltipOptions={{ position: "top" }}
              className="p-button-rounded p-button-success mr-2"
              onClick={() => setDataBillingTenantRow(op)}
            />
          </>
        );
      },
    },
  ];
  return (
    <div className="col-12">
      <DynamicDataTable columns={columns} data={data} filter paginator />
    </div>
  );
}

export default TableBillingTenant;
