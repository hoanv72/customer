import React, { createContext, useContext, useState } from 'react';

const ProductUIContext = createContext();

export function useProductUIContext() {
  return useContext(ProductUIContext);
}

export const ProductUIConsumer = ProductUIContext.Consumer;

export function ProductUIProvider({ productUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState('');
  const [ids, setIds] = useState([]);

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    newButtonClick: productUIEvents.newButtonClick,
    openEditModal: productUIEvents.openEditModal,
    openDeleteModal: productUIEvents.openDeleteModal,
  };

  return (
    <ProductUIContext.Provider value={value}>
      {children}
    </ProductUIContext.Provider>
  );
}
