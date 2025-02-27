import DynamicDataTable, {
  ColumnConfig,
} from "../../../components/DynamicDataTable/DynamicDataTable";
import { dataTableObservationAdapter } from "../adapters/tenant.adapter";
import { ApiObservation } from "../models/tenant.model";

interface TableObservationsTenantProps {
  data: ApiObservation[];
}
function TableObservationsTenant({ data }: TableObservationsTenantProps) {
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
        filter
        data={dataTableObservationAdapter(data)}
        columns={columns}
        paginator
      />
    </div>
  );
}

export default TableObservationsTenant;
