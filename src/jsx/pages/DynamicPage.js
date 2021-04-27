import React from "react";
import Home from "../components/Dashboard/Home";
import { ClientPages } from "./Categories/Client/ClientPages";
import { ProductPages } from "./Categories/Product/ProductPages";
import { WarehousePages } from "./Categories/Warehouse/WarehousePages";
import { TargetPages } from "./Categories/Target/TargetPages";
import ChangePassword from "./ChangePassword";
import CustomerPage from "./Client/CustomerPage";
import Error404 from "./Error404";
import OrganizationPage from "./Organization/OrganizationPage";
import Product from "./Product/Product";
import Route from "./Categories/Route";
import AddRoute from "./Categories/Route/AddRoute";

export default function DynamicPage({ dmsPage, ...props }) {
  // 3 case
  // if dmsPage includes 'client' word => use ClientPages
  // if dmsPage includes 'product' word => use ProductPages
  // if dmsPage includess 'warehouse' word => use WareHousePages
  if (dmsPage.includes("dashboard")) {
    return <Home />;
  }
  if (dmsPage.includes("changePassword")) {
    return <ChangePassword />;
  }
  if (dmsPage.includes("notFound")) {
    return <Error404 />;
  }
  if (dmsPage.includes("Client")) {
    return <ClientPages dmsPage={dmsPage} {...props} />;
  }
  if (dmsPage.includes("Product")) {
    return <ProductPages dmsPage={dmsPage} {...props} />;
  }
  if (dmsPage.includes("Warehouse")) {
    return <WarehousePages dmsPage={dmsPage} {...props} />;
  }
  if (dmsPage.includes("categoryTarget")) {
    return <TargetPages dmsPage={dmsPage} {...props} />;
  }
  // if (dmsPage.includes('client')) {
  //   return <CustomerPage dmsPage={dmsPage} {...props} />;
  // }
  if (dmsPage.includes("personnel")) {
    return <OrganizationPage dmsPage={dmsPage} {...props} />;
  }
  if (dmsPage.includes("route")) {
    return <Route dmsPage={dmsPage} {...props} />;
  }
  if (dmsPage.includes("route/add")) {
    return <AddRoute {...props} />;
  }
  if (dmsPage.includes("product")) {
    return <Product dmsPage={dmsPage} {...props} />;
  }
}
