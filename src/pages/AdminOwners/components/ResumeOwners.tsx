import { Card } from "primereact/card";
import { ApiOwners } from "../models/owners.model";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Badge } from "primereact/badge";
import { Divider } from "primereact/divider";

interface ResumeOwnersProps {
  ownerData: ApiOwners;
}
function ResumeOwners({ ownerData }: ResumeOwnersProps): JSX.Element {
  return (
    <div className="grid">
      <div className="card col-5">
        <Card title="Datos propietario">
          <p className="m-3">
            <strong className="mr-2">Documento:</strong>
            {ownerData.document}
          </p>
          <p className="m-3">
            <strong className="mr-2">Nombre:</strong>
            {ownerData.name}
          </p>
          <p className="m-3">
            <strong className="mr-2">Telefono:</strong>
            {ownerData.phone}
          </p>
          <p className="m-3">
            <strong className="mr-2">Direccion:</strong>
            {ownerData.address}
          </p>

          <p className="m-3">
            <strong className="mr-2">Correo:</strong>
            {ownerData.email}
          </p>
          <p className="m-3">
            <strong className="mr-2">Comision:</strong>
            {ownerData.percentageCommission}
          </p>

          <p className="m-3">
            <strong className="mr-2">Banco:</strong>
            {ownerData.bank}
          </p>
          <p className="m-3">
            <strong className="mr-2">Tipo de cuenta:</strong>
            {ownerData.accountType}
          </p>

          <p className="m-3">
            <strong className="mr-2">Número de cuenta:</strong>
            {ownerData.accountNumber}
          </p>
          <p className="m-3 m-2">
            <strong className="mr-2">Valor cuatro por mil:</strong>
            {ownerData.fourPerThousand ? (
              <Badge severity="success" value={"Si"} />
            ) : (
              <Badge severity="success" value={"No"} />
            )}
          </p>
          <p className="m-3">
            <strong className="mr-2">Valor cuatro por mil:</strong>
            {ownerData.fourPerThousandValue}
          </p>
        </Card>
      </div>
      <div className="card col-5">
        <Accordion activeIndex={0}>
          <AccordionTab header="Propiedades">
            <div>
              {ownerData.properties && ownerData.properties.length > 0
                ? ownerData.properties.map((property) => (
                    <div className="flex flex-column">
                      <p className="m-0">
                        <Badge value={property.idProperty} />
                        <strong className="m-2">Propiedad:</strong>
                        {property.nameProperty}
                      </p>
                      <Divider layout="horizontal" />
                    </div>
                  ))
                : "No hay propiedades"}
            </div>
          </AccordionTab>
          <AccordionTab header="Contratos">
            <div>
              {ownerData.contract && ownerData.contract.length > 0
                ? ownerData.contract.map((contract) => (
                    <div className="flex flex-column">
                      <p className="m-0">
                        <Badge value={contract.idContract} />
                        <strong className="m-2">Número de contrato:</strong>
                        {contract.numberContract}
                      </p>
                      <Divider layout="horizontal" />
                    </div>
                  ))
                : "No hay contratos"}
            </div>
          </AccordionTab>
          <AccordionTab header="Observaciones">
            <div>
              {ownerData.observations && ownerData.observations.length > 0
                ? ownerData.observations.map((observation) => (
                    <div className="flex flex-column">
                      <p className="m-0">
                        <Badge value={observation.idObservation} />
                        <strong className="m-2">Propiedad:</strong>
                        {observation.observation}
                      </p>
                      <Divider layout="horizontal" />
                    </div>
                  ))
                : "No hay observaciones"}
            </div>
          </AccordionTab>
        </Accordion>
      </div>
    </div>
  );
}

export default ResumeOwners;
