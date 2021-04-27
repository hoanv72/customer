import React, { createContext, useContext, useState } from 'react';

const CustomerUIContext = createContext();

export function useCustomerUIContext() {
  return useContext(CustomerUIContext);
}

export const CustomerUIConsumer = CustomerUIContext.Consumer;

export function CustomerUIProvider({ customerUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState('');
  const [ids, setIds] = useState([]);

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    newButtonClick: customerUIEvents.newButtonClick,
    goBack: customerUIEvents.goBack,
    openEditModal: customerUIEvents.openEditModal,
    openDeleteModal: customerUIEvents.openDeleteModal,
  };

  return (
    <CustomerUIContext.Provider value={value}>
      {children}
    </CustomerUIContext.Provider>
  );
}
