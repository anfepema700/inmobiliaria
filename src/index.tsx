import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "/node_modules/primeflex/primeflex.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminProperties from "./pages/AdminProperties/AdminProperties";
import MainMenu from "./components/MainMenu/MainMenu";
import AdminProperty from "./pages/AdminProperty/AdminProperty";
import "primeicons/primeicons.css";
import AdminTenant from "./pages/AdminTenant/AdminTenant";
import AdminCoDebtor from "./pages/AdminCoDebtor/AdminCoDebtor";
import AdminContract from "./pages/AdminContract/AdminContract";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin-properties",
    element: <AdminProperties />,
  },
  {
    path: "/admin-property",
    element: <AdminProperty />,
  },
  {
    path: "/admin-tenant",
    element: <AdminTenant />,
  },
  {
    path: "/admin-co-debtor",
    element: <AdminCoDebtor />,
  },
  {
    path: "/admin-contract",
    element: <AdminContract />,
  },
]);

root.render(
  <React.StrictMode>
    <MainMenu />
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
