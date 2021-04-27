import React, { Fragment } from 'react';

/// Components
import Markup from './jsx';

/// Style
import './vendor/bootstrap-select/dist/css/bootstrap-select.min.css';
import './css/style.css';

import { withResizeDetector } from 'react-resize-detector';
import DMSSnackBar from './jsx/components/SnackBar/SnackBar';

const App = ({ width }) => {
  const body = document.querySelector('body');
  body.setAttribute('data-typography', 'poppins');
  body.setAttribute('data-theme-version', 'light');
  body.setAttribute('data-layout', 'vertical');
  body.setAttribute('data-nav-headerbg', 'color_1');
  body.setAttribute('data-headerbg', 'color_1');
  body.setAttribute('data-sidebar-style', 'compact');
  body.setAttribute('data-sibebarbg', 'color_1');
  body.setAttribute('data-primary', 'color_1');
  body.setAttribute('data-sidebar-position', 'fixed');
  body.setAttribute('data-header-position', 'fixed');
  body.setAttribute('data-container', 'wide');
  body.setAttribute('direction', 'ltr');

  width >= 768 && width < 1300
    ? body.setAttribute('data-sidebar-style', 'mini')
    : width <= 768
    ? body.setAttribute('data-sidebar-style', 'overlay')
    : body.setAttribute('data-sidebar-style', 'full');

  return (
    <Fragment>
      <Markup />
      <DMSSnackBar />
    </Fragment>
  );
};

export default withResizeDetector(App);
