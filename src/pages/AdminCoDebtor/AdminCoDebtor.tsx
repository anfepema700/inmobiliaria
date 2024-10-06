import FormCodebtor from "./components/FormCodebtor";

function AdminCoDebtor(): JSX.Element {
  return (
    <div className="grid">
      <h1 className="col-12 text-center">Administración codeudores</h1>
      <div className="col-12">
        <FormCodebtor />
      </div>
    </div>
  );
}

export default AdminCoDebtor;
