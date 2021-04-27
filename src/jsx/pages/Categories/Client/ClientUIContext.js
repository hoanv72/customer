import React, { createContext, useContext, useState } from "react";

const ClientUIContext = createContext();

export function useClientUIContext() {
  return useContext(ClientUIContext);
}

export const ClientUIConsumer = ClientUIContext.Consumer;

export function ClientUIProvider({ clientUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState("");
  const [ids, setIds] = useState([]);

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    newButtonClick: clientUIEvents.newButtonClick,
    openEditModal: clientUIEvents.openEditModal,
    openDeleteModal: clientUIEvents.openDeleteModal,
  };

  return (
    <ClientUIContext.Provider value={value}>
      {children}
    </ClientUIContext.Provider>
  );
}
