import React, { createContext, useContext, useState } from 'react';

const TargetUIContext = createContext();

export function useTargetUIContext() {
  return useContext(TargetUIContext);
}

export const TargetUIConsumer = TargetUIContext.Consumer;

export function TargetUIProvider({ targetUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState('');
  const [ids, setIds] = useState([]);

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    newButtonClick: targetUIEvents.newButtonClick,
    openEditModal: targetUIEvents.openEditModal,
    openDeleteModal: targetUIEvents.openDeleteModal,
  };

  return (
    <TargetUIContext.Provider value={value}>
      {children}
    </TargetUIContext.Provider>
  );
}
