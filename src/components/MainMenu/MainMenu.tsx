import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";

function MainMenu(): JSX.Element {
  const items: MenuItem[] = [
    {
      label: "Inicio",
      icon: "pi pi-fw pi-home",
      command: () => {
        window.location.href = "/";
      },
    },
    {
      label: "Propietarios",
      icon: "pi pi-fw pi-user",
      command: () => {
        window.location.href = "/admin-properties";
      },
    },
    {
      label: "Inmuebles",
      icon: "pi pi-fw pi-building-columns",
      command: () => {
        window.location.href = "/admin-property";
      },
    },
    {
      label: "Inquilinos",
      icon: "pi pi-fw pi-sitemap",
      command: () => {
        window.location.href = "/admin-tenant";
      },
    },
    {
      label: "Codeudores",
      icon: "pi pi-fw pi-users",
      command: () => {
        window.location.href = "/admin-co-debtor";
      },
    },
    {
      label: "Contratos",
      icon: "pi pi-fw pi-receipt",
      command: () => {
        window.location.href = "/admin-contract";
      },
    },
  ];

  return (
    <div className="card">
      <Menubar model={items} />
    </div>
  );
}

export default MainMenu;
