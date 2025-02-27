import { Button } from "primereact/button";
import DynamicDataTable, {
  ColumnConfig,
} from "../../../components/DynamicDataTable/DynamicDataTable";
import { ApiContract } from "../models/adminContract.model";

interface TableContractProps {
  dataTableContract: ApiContract[];
  setDataContractRow: (data: ApiContract) => void;
}
function TableContract({
  dataTableContract,
  setDataContractRow,
}: TableContractProps): JSX.Element {
  const columns: ColumnConfig[] = [
    {
      field: "idContract",
      header: "id",
    },
    {
      field: "increment",
      header: "Incremento",
    },
    {
      field: "numberContract",
      header: "N° de Contrato",
    },
    {
      field: "dateStart",
      header: "Fecha inicio",
    },
    {
      field: "dateEnd",
      header: "Fecha fin",
    },
    {
      field: "dateNotification",
      header: "Fecha notificación",
    },
    {
      field: "owner.name",
      header: "Propietario",
    },

    {
      field: "tenant.name",
      header: "Inquilino",
    },
    {
      field: "actions",
      header: "Acciones",
      body: (op) => (
        <Button
          icon="pi pi-pencil"
          tooltip="Editar"
          tooltipOptions={{ position: "top" }}
          className="p-button-rounded p-button-success mr-2"
          onClick={() => {
            setDataContractRow(op);
          }}
        />
      ),
    },
  ];
  return (
    <div>
      <DynamicDataTable
        columns={columns}
        data={dataTableContract}
        paginator
        filter
      />
    </div>
  );
}

export default TableContract;
