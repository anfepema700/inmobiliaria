import { Button } from "primereact/button";
import DynamicDataTable, {
  ColumnConfig,
} from "../../../components/DynamicDataTable/DynamicDataTable";
import { ApiCodebtor } from "../model/codebtor.model";
interface Props {
  data: ApiCodebtor[];
  setCoDebtorRow: (value: ApiCodebtor) => void;
}
function TableCodebtor({ data, setCoDebtorRow }: Props) {
  const columns: ColumnConfig[] = [
    {
      field: "idCoDebtor",
      header: "idCoDebtor",
    },
    {
      field: "name",
      header: "Nombre",
      body: (op) => op.name,
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
      field: "actions",
      header: "Acciones",

      body(op) {
        return (
          <>
            <Button
              type="button"
              className="mr-2"
              onClick={() => {
                setCoDebtorRow(op);
              }}
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
      <DynamicDataTable columns={columns} data={data} paginator filter />
    </div>
  );
}

export default TableCodebtor;
