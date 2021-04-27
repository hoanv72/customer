import React from "react";
import { useHistory } from "react-router-dom";
import { LIST_PAGES } from "../../../../utils/constants";
import { ClientDeleteDialog } from "./client-delete-dialog/ClientDeleteDialog";
import { ClientEditDialog } from "./client-edit-dialog/ClientEditDialog";
import ClientCard from "./ClientCard";
import { ClientUIProvider } from "./ClientUIContext";

export function ClientPages({ dmsPage, match, ...routeProps }) {
  const history = useHistory();
  const segment = LIST_PAGES[dmsPage].path;

  const clientUIEvents = {
    newButtonClick: () => {
      history.push(`/${segment}/new`);
    },
    openEditModal: (id) => {
      history.push(`/${segment}/${id}/edit`);
    },
    openDeleteModal: (id) => {
      history.push(`/${segment}/${id}/delete`);
    },
  };

  let componentKey = `${dmsPage}-key`;

  const renderSwitchComponent = (path) => {
    if (path.includes("new")) {
      return (
        <ClientEditDialog
          show={match !== null}
          onHide={() => history.push(`/${segment}`)}
          dmsPage={dmsPage}
          match={history}
        />
      );
    }
    if (path.includes("edit")) {
      return (
        <ClientEditDialog
          show={match !== null}
          id={match && match.params.id}
          onHide={() => history.push(`/${segment}`)}
          dmsPage={dmsPage}
        />
      );
    }
    if (path.includes("delete")) {
      return (
        <ClientDeleteDialog
          show={match !== null}
          id={match && match.params.id}
          onHide={() => history.push(`/${segment}`)}
          dmsPage={dmsPage}
        />
      );
    }
  };

  return (
    <ClientUIProvider clientUIEvents={clientUIEvents} key={componentKey}>
      {/* Switch case routes */}
      {renderSwitchComponent(match.path)}

      {/* custom table depends on dmsPage */}
      <ClientCard dmsPage={dmsPage} />
    </ClientUIProvider>
  );
}
