import { Button } from "primereact/button";
import DynamicDataTable, {
  ColumnConfig,
} from "../../../components/DynamicDataTable/DynamicDataTable";
import { ApiBillingOwner } from "../models/billingOwner.model";
import { Tooltip } from "primereact/tooltip";
import { Badge } from "primereact/badge";

interface TableBilingOwnerProps {
  dataBillingOwners: ApiBillingOwner[];
  setDataBillingOwnerRow: (data: ApiBillingOwner) => void;
  setShowResumeOwner: (data: boolean) => void;
  getOwnerDataById: (idOwner: number) => void;
}
function TableBilingOwner({
  dataBillingOwners,
  setDataBillingOwnerRow,
  setShowResumeOwner,
  getOwnerDataById,
}: TableBilingOwnerProps): JSX.Element {
  const columns: ColumnConfig[] = [
    {
      field: "idBillingOwner",
      header: "id",
    },
    {
      field: "comissionPercentage",
      header: "Porcentaje de comisión",
    },
    {
      field: "comissionValue",
      header: "Valor de la comisión",
    },
    {
      field: "fourPerThousand",
      header: "Valor cuatro por mil",
    },
    {
      field: "valueToPayment",
      header: "Valor a pagar",
    },
    {
      field: "discharge",
      header: "Descuento",
    },
    {
      field: "datePayment",
      header: "Fecha de pago",
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
      field: "owner.name",
      header: "Propietario",
      body(op) {
        return (
          <div className="card flex justify-content-center">
            <Button
              type="button"
              link
              label={op.owner.name}
              icon="pi pi-user"
              tooltip="Ver resumen"
              tooltipOptions={{ position: "top" }}
              onClick={() => {
                setShowResumeOwner(true);
                getOwnerDataById(op.owner.idOwner);
              }}
            />
          </div>
        );
      },
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
              onClick={() => {
                setDataBillingOwnerRow(op);
              }}
            />
          </>
        );
      },
    },
  ];

  return (
    <DynamicDataTable
      columns={columns}
      data={dataBillingOwners}
      paginator
      filter
    />
  );
}

export default TableBilingOwner;
