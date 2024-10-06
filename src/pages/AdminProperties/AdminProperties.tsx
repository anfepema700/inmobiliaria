import { Button } from "primereact/button";
import FormProperties from "./components/FormProperties";
function AdminProperties(): JSX.Element {
  return (
    <div className="grid mr-8">
      <h1 className="col-12 text-center">Administración de Propietarios</h1>
      <div className="col-12 ml-8 mt-2">
        <FormProperties />
      </div>
    </div>
  );
}

export default AdminProperties;
