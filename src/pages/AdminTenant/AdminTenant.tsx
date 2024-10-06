import { useState } from "react";
import FormTenant from "./components/FormTenant";
import { Dialog } from "primereact/dialog";
import FormObservationTenant from "./components/FormObservationTenant";
import { Button } from "primereact/button";

function AdminTenant(): JSX.Element {
  const [visibleObservationForm, setVisibleObservationForm] =
    useState<boolean>(false);
  return (
    <div className="grid mr-8">
      <h1 className="col-12 text-center">Administración de Inquilinos</h1>
      <div className="col-2 md:col-2 sm:col-12">
        <Button
          className="col-12 md:col-12 sm:col-12"
          label="Agregar observación"
          onClick={() => setVisibleObservationForm(true)}
          icon="pi pi-plus"
        />
      </div>
      <div className="col-12 md:col-12 sm:col-12 ml-8">
        <FormTenant />
      </div>
      <Dialog
        header="Agregar observación"
        visible={visibleObservationForm}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visibleObservationForm) return;
          setVisibleObservationForm(false);
        }}
      >
        <FormObservationTenant idTenant={1} />
      </Dialog>
    </div>
  );
}

export default AdminTenant;
