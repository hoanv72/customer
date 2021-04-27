import React, { createContext, useContext, useState } from 'react';

const OrganizationUIContext = createContext();

export function useOrganizationUIContext() {
  return useContext(OrganizationUIContext);
}

export const OrganizationUIConsumer = OrganizationUIContext.Consumer;

export function OrganizationUIProvider({ organizationUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState('');
  const [ids, setIds] = useState([]);

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    newButtonClick: organizationUIEvents.newButtonClick,
    // openEditModal: organizationUIEvents.openEditModal,
    // openDeleteModal: organizationUIEvents.openDeleteModal,
  };

  return (
    <OrganizationUIContext.Provider value={value}>
      {children}
    </OrganizationUIContext.Provider>
  );
}
