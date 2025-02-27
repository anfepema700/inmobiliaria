import DynamicDataTable, {
  ColumnConfig,
} from "../../../components/DynamicDataTable/DynamicDataTable";
import { dataTableObservationAdapter } from "../../AdminTenant/adapters/tenant.adapter";
import { ApiObservation } from "../../AdminTenant/models/tenant.model";
interface TableOwnersObservationsProps {
  data: ApiObservation[];
}
function TableOwnersObservations({
  data,
}: TableOwnersObservationsProps): JSX.Element {
  const columns: ColumnConfig[] = [
    {
      field: "idObservation",
      header: "id",
    },
    {
      field: "observation",
      header: "Observación",
    },
  ];
  return (
    <div>
      <DynamicDataTable
        data={dataTableObservationAdapter(data)}
        columns={columns}
        paginator
        filter
      />
    </div>
  );
}

export default TableOwnersObservations;
