import { Column } from "primereact/column";
import DynamicDataTable, {
  ColumnConfig,
} from "../../../components/DynamicDataTable/DynamicDataTable";
import { ApiOwners } from "../models/owners.model";
import { Button } from "primereact/button";
import { ApiProperty } from "../../AdminProperty/models/adminProperty.model";
import { ApiContract } from "../../AdminContract/models/adminContract.model";

interface TableOwnersProps {
  data: ApiOwners[];
  setDataOwnersRow: (data: ApiOwners) => void;
  setVisibleFormObservation: (visible: boolean) => void;
  setVisibleResumeOwnerData: (visible: boolean) => void;
}
function TableOwners({
  data,
  setDataOwnersRow,
  setVisibleFormObservation,
  setVisibleResumeOwnerData,
}: TableOwnersProps): JSX.Element {
  const columns: ColumnConfig[] = [
    {
      field: "name",
      header: "Nombre",
    },
    {
      field: "bank",
      header: "Banco",
    },
    {
      field: "accountType",
      header: "Tipo de Cuenta",
    },
    {
      field: "accountNumber",
      header: "Número de Cuenta",
    },
    {
      field: "fourPerThousandValue",
      header: "Valor cuatro por mil",
    },
    {
      field: "administrationPayment",
      header: "Pago administración",
      body: (op) => {
        const propertiesData: ApiProperty[] = op.properties;
        return (
          <>
            {propertiesData.map((op, index) => (
              <p key={index}> {op.administrationPayment}</p>
            ))}
          </>
        );
      },
    },
    {
      field: "properties",
      header: "Propiedades",
      body: (op) => {
        const propertiesData: ApiProperty[] = op.properties;
        return (
          <>
            {propertiesData.map((op, index) => (
              <p key={index}> {op.nameProperty}</p>
            ))}
          </>
        );
      },
    },
    {
      field: "contract",
      header: "Contrato",
      body: (op) => {
        return (
          <>
            {op.contract.map((op: ApiContract, index: number) => (
              <p key={index}> {op.numberContract}</p>
            ))}
          </>
        );
      },
    },
    {
      field: "actions",
      header: "Acciones",
      body(op) {
        return (
          <>
            <Button
              icon="pi pi-pencil"
              className="mr-2"
              onClick={() => setDataOwnersRow(op)}
              tooltip="Editar"
              severity="info"
            />
            <Button
              tooltip="Observaciones"
              icon="pi pi-plus"
              className="mr-2"
              onClick={() => {
                setDataOwnersRow(op);
                setVisibleFormObservation(true);
              }}
              severity="success"
            />
            <Button
              tooltip="Resumen"
              icon="pi pi-list"
              className="mr-2"
              onClick={() => {
                setDataOwnersRow(op);
                setVisibleResumeOwnerData(true);
              }}
              severity="contrast"
            />
          </>
        );
      },
    },
  ];
  return (
    <div>
      <DynamicDataTable data={data} columns={columns} paginator filter />
    </div>
  );
}

export default TableOwners;
