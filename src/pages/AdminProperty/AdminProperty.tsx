import FormProperty from "./components/FormProperty";

function AdminProperty(): JSX.Element {
  return (
    <div className="grid mr-8 ml-8">
      <h1 className="col-12 text-center">Administración de Propiedades</h1>
      <div className="col">
        <FormProperty />
      </div>
    </div>
  );
}

export default AdminProperty;
