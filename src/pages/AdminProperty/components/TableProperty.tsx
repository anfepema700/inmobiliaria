import { Button } from "primereact/button";
import DynamicDataTable, {
  ColumnConfig,
} from "../../../components/DynamicDataTable/DynamicDataTable";
import { ApiProperty } from "../models/adminProperty.model";

interface TablePropertyProps {
  data: ApiProperty[];
  setRowDataProperty(rowDataProperty: ApiProperty): void;
}
function TableProperty({
  data,
  setRowDataProperty,
}: TablePropertyProps): JSX.Element {
  const columns: ColumnConfig[] = [
    {
      field: "idProperty",
      header: "id",
    },
    {
      field: "owner.name",
      header: "Propietario",
    },
    {
      field: "nameProperty",
      header: "Propiedad",
    },
    {
      field: "address",
      header: "Dirección",
    },
    {
      field: "canon",
      header: "Canon",
    },
    {
      field: "administrationPayment",
      header: "Pago administración",
    },
    {
      field: "actions",
      header: "Acciones",
      body(op) {
        return (
          <>
            <Button
              type="button"
              className="mr-2"
              severity="warning"
              onClick={() => setRowDataProperty(op)}
            >
              Editar
            </Button>
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

export default TableProperty;
