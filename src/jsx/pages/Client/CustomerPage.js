import React, { useEffect } from "react";
import { useRouteMatch } from "react-router";
import { LIST_PAGES } from "../../../utils/constants";
import Route from "../Categories/Route";
import AddRoute from "../Categories/Route/AddRoute";
import ContactEditDialog from "./contact-edit-dialog/ContactEditDialog";
import CustomerCreatePage from "./customer-create-page/CustomerCreatePage";
import CustomerDetailPage from "./customer-create-page/CustomerDetailPage";
import CustomerDeleteDialog from "./customer-delete-dialog/CustomerDeleteDialog";
import CustomerCard from "./CustomerCard";
import { CustomerUIProvider } from "./CustomerUIContext";

export default function CustomerPage({ history, dmsPage, match }) {
  const segment = LIST_PAGES[dmsPage].path;
  const { path, params } = useRouteMatch();
  const { id, contactId } = params;

  const customerUIEvents = {
    newButtonClick: () => {
      history.push(`/${segment}/new`);
    },
    goBack: () => {
      history.push(`/${segment}`);
    },
    openEditModal: (id) => {
      history.push(`/${segment}/${id}/edit`);
    },
    openDeleteModal: (id) => {
      history.push(`/${segment}/${id}/delete`);
    },
  };

  const renderSwitchComponent = (path) => {
    if (path.includes("/client/:id/contact/add")) {
      return (
        <ContactEditDialog
          dmsPage={dmsPage}
          onHide={() => history.push(`/${segment}/${id}/edit`)}
          show={true}
        />
      );
    }
    if (path.includes("/client/:id/contact/:contactId/edit")) {
      return (
        <ContactEditDialog
          dmsPage={dmsPage}
          id={contactId}
          onHide={() => history.push(`/${segment}/${id}/edit`)}
          show={true}
        />
      );
    }
    if (path.includes("/client/:id/contact/:contactId/delete")) {
      return (
        <>
          <CustomerDeleteDialog
            dmsPage={dmsPage}
            id={contactId}
            show={true}
            onHide={() => history.push(`/${segment}/${id}/edit`)}
          />
        </>
      );
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const componentKey = `key-${dmsPage}`;
  return (
    <>
      <CustomerUIProvider
        customerUIEvents={customerUIEvents}
        key={componentKey}
      >
        {renderSwitchComponent(path)}
        {path === "/route/add" && <AddRoute />}
        {path === "/client" && <CustomerCard dmsPage={dmsPage} />}

        {path === "/client/new" && (
          <CustomerCreatePage
            show={match !== null}
            onHide={() => history.push(`/${segment}`)}
            dmsPage={dmsPage}
            match={history}
            id={id}
            showTable={false}
          />
        )}

        {String(path) === "/client/:id/edit" && (
          <CustomerCreatePage
            show={match !== null}
            onHide={() => history.push(`/${segment}`)}
            dmsPage={dmsPage}
            match={history}
            id={id}
            showTable={true}
          />
        )}

        {String(path) === "/client/:id/detail" && (
          <CustomerDetailPage
            show={match !== null}
            onHide={() => history.push(`/${segment}`)}
            dmsPage={dmsPage}
            match={history}
            id={id}
            showTable={true}
          />
        )}
      </CustomerUIProvider>
    </>
  );
}
