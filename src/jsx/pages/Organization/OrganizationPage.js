import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import OrganizationNewDialog from './components/OrganizationNewDialog';
import { OrganizationUIProvider } from './OrganizationUIContext';
import OrganizationTable from './OrganizationTable';

import { LIST_PAGES } from '../../../utils/constants';

function OrganizationPage({ dmsPage, match, ...props }) {
  const history = useHistory();
  let componentKey = `${dmsPage}-key`;
  const segment = LIST_PAGES[dmsPage].path;

  const organizationUIEvents = {
    newButtonClick: () => {
      history.push(`/${segment}/new`);
    },
    editButtonClick: () => {
      history.push(`/${segment}/edit`);
    },
  };

  const renderSwitchComponent = (path) => {
    switch (true) {
      case path.includes('new'):
        return (
          <OrganizationNewDialog
            show={!!match}
            onHide={() => history.push(`/${segment}`)}
            dmsPage={dmsPage}
            match={history}
          />
        )
      default:
        return <></>
    }
  };

  return (
    <OrganizationUIProvider organizationUIEvents={organizationUIEvents} key={componentKey}>
      <OrganizationTable
        dmsPage={dmsPage}
      />

      {/* Switch case routes */}
      {renderSwitchComponent(match.path)}
    </OrganizationUIProvider>
  );
}

export default connect()(OrganizationPage);
