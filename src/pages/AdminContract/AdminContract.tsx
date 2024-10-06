import FormContract from "./components/FormContract";

function AdminContract(): JSX.Element {
  return (
    <div className="grid mr-8 ml-8">
      <h1 className="col-12 text-center">Administración de Contratos</h1>
      <div className="col-12 md:col-12 sm:col-12">
        <FormContract />
      </div>
    </div>
  );
}

export default AdminContract;
