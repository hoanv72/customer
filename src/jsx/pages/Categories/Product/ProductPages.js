import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { LIST_PAGES } from '../../../../utils/constants';
import { ProductDeleteDialog } from './product-delete-dialog/ProductDeleteDialog';
import { ProductEditDialog } from './product-edit-dialog/ProductEditDialog';
import ProductCard from './ProductCard';
import { ProductUIProvider } from './ProductUIContext';

export function ProductPages({ dmsPage, match, ...routeProps }) {
  const history = useHistory();
  const segment = LIST_PAGES[dmsPage].path;

  const productUIEvents = {
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
    if (path.includes('new')) {
      return (
        <ProductEditDialog
          show={match !== null}
          onHide={() => history.push(`/${segment}`)}
          dmsPage={dmsPage}
          match={history}
        />
      );
    }
    if (path.includes('edit')) {
      return (
        <ProductEditDialog
          show={match !== null}
          id={match && match.params.id}
          onHide={() => history.push(`/${segment}`)}
          dmsPage={dmsPage}
        />
      );
    }
    if (path.includes('delete')) {
      return (
        <ProductDeleteDialog
          show={match !== null}
          id={match && match.params.id}
          onHide={() => history.push(`/${segment}`)}
          dmsPage={dmsPage}
        />
      );
    }
  };

  return (
    <ProductUIProvider productUIEvents={productUIEvents} key={componentKey}>
      {/* Switch case routes */}
      {renderSwitchComponent(match.path)}

      {/* custom table depends on dmsPage */}
      <ProductCard dmsPage={dmsPage} />
    </ProductUIProvider>
  );
}
