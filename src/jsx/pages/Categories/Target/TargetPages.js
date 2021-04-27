import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { LIST_PAGES } from '../../../../utils/constants';
import { TargetDeleteDialog } from './target-delete-dialog/TargetDeleteDialog';
import { TargetEditDialog } from './target-edit-dialog/TargetEditDialog';
import ProductCard from './TargetCard';
import { TargetUIProvider } from './TargetUIContext';

export function TargetPages({ dmsPage, match, ...routeProps }) {
  const history = useHistory();
  console.log(history);
  const segment = LIST_PAGES[dmsPage].path;

  const targetUIEvents = {
    newButtonClick: () => {
      history.replace(`/${segment}/new`);
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
        <TargetEditDialog
          // show={match !== null}
          // onHide={() => history.push(`/${segment}`)}
          dmsPage={dmsPage}
          match={history}
        />
      );
    }
    if (path.includes('edit')) {
      return (
        <TargetEditDialog
          show={match !== null}
          id={match && match.params.id}
          onHide={() => history.push(`/${segment}`)}
          dmsPage={dmsPage}
        />
      );
    }
    if (path.includes('delete')) {
      return (
        <TargetDeleteDialog
          show={match !== null}
          id={match && match.params.id}
          onHide={() => history.push(`/${segment}`)}
          dmsPage={dmsPage}
        />
      );
    }
  };

  return (
  
    <TargetUIProvider targetUIEvents={targetUIEvents} key={componentKey}>
      {/* Switch case routes */}
      {renderSwitchComponent(match.path)}

      {/* custom table depends on dmsPage */}
      <ProductCard dmsPage={dmsPage} />
    </TargetUIProvider>
  );
}
