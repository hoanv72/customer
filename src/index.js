import React from "react";
import ReactDOM from "react-dom";
import ReduxToastr from "react-redux-toastr";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import reportWebVitals from "./reportWebVitals";
import SimpleReactLightbox from "simple-react-lightbox";

ReactDOM.render(
  <Provider store={store}>
    <SimpleReactLightbox>
      <App />
      <ReduxToastr
        timeOut={5000}
        newestOnTop={true}
        position="top-center"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        closeOnToastrClick
      />
    </SimpleReactLightbox>
  </Provider>,
  document.getElementById("root")
);
reportWebVitals();
