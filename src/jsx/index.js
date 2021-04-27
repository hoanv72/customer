import React from "react";
import { useSelector } from "react-redux";

/// React router dom
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
/// Css
import "./index.css";
import "./chart.css";
import "./step.css";

/// Layout
import Nav from "./layouts/nav";

import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Error404 from "./pages/Error404";
import { LIST_PAGES } from "../utils/constants";
import DynamicPage from "./pages/DynamicPage";
import CustomerPage from "./pages/Client/CustomerPage";
import AddRoute from "./pages/Categories/Route/AddRoute";

export const history = createBrowserHistory();

const Markup = () => {
  const isAuthorized = useSelector((state) => state.auth.loggedIn);

  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];
  let pagePath = path.split("-").includes("page");

  return (
    <Router history={history}>
      {!isAuthorized ? (
        <>
          <div>
            <div style={{ height: "100vh" }}>
              <Switch>
                <Route path="/" exact>
                  <Redirect to="/login" />
                </Route>
                <Route path="/login" exact component={Login} />
                <Route
                  path="/forgot-password"
                  exact
                  component={ForgotPassword}
                />
                <Route
                  path="/forgot-password"
                  render={({ match: { url } }) => (
                    <>
                      <Route
                        path={`${url}/`}
                        component={ForgotPassword}
                        exact
                      />
                      <Route path={`${url}/email`} component={ForgotPassword} />
                      <Route path={`${url}/phone`} component={ForgotPassword} />
                    </>
                  )}
                />

                {/* Not found page */}
                <Route path="/not-found" exact component={Error404} />
                {/* Handle wildcard url */}
                <Route path="*">
                  <Redirect to="/login" />
                </Route>
              </Switch>
            </div>
          </div>
        </>
      ) : (
        // Content route with protected
        <div>
          <div
            id={`${!pagePath ? "main-wrapper" : ""}`}
            className={`${!pagePath ? "show" : "mh100vh"} ${
              !path ? "right-profile" : ""
            }`}
          >
            {!pagePath && <Nav />}

            <div className={`${!pagePath ? "content-body" : ""}`}>
              <div
                className={`${!pagePath ? "container-fluid" : ""}`}
                style={{ minHeight: window.screen.height - 60 }}
              >
                <Switch>
                  {/* Handle extra routes for Client */}
                  <Route
                    path={`/client/:id/contact/add`}
                    exact
                    render={(routeProps) => (
                      <CustomerPage dmsPage={"client"} {...routeProps} />
                    )}
                  />
                  <Route
                    path={`/client/:id/contact/:contactId/edit`}
                    exact
                    render={(routeProps) => (
                      <CustomerPage dmsPage={"client"} {...routeProps} />
                    )}
                  />
                  <Route
                    path={`/client/:id/contact/:contactId/delete`}
                    exact
                    render={(routeProps) => (
                      <CustomerPage dmsPage={"client"} {...routeProps} />
                    )}
                  />
                  <Route
                    path={`/client/:id/edit`}
                    exact
                    render={(routeProps) => (
                      <CustomerPage dmsPage={"client"} {...routeProps} />
                    )}
                  />
                  <Route
                    path={`/client/:id/detail`}
                    exact
                    render={(routeProps) => (
                      <CustomerPage dmsPage={"client"} {...routeProps} />
                    )}
                  />
                  <Route
                    path={`/client/new`}
                    exact
                    render={(routeProps) => (
                      <CustomerPage dmsPage={"client"} {...routeProps} />
                    )}
                  />
                  <Route
                    path={`/client`}
                    exact
                    render={(routeProps) => (
                      <CustomerPage dmsPage={"client"} {...routeProps} />
                    )}
                  />
                  {/* _____________________ */}
                  <Route
                    path={`/route/add`}
                    exact
                    render={(routeProps) => <AddRoute {...routeProps} />}
                  />

                  {/* _____________________ */}
                  {/* Programatic render route */}
                  {Object.keys(LIST_PAGES).map((dmsKey) => (
                    <Route
                      exact
                      key={dmsKey}
                      path={`/${LIST_PAGES[dmsKey].path}`}
                      render={(routeProps) => (
                        <DynamicPage dmsPage={dmsKey} {...routeProps} />
                      )}
                    />
                  ))}
                  {/* routes for create new data */}
                  {Object.keys(LIST_PAGES).map((dmsKey) => (
                    <Route
                      exact
                      key={dmsKey + "create"}
                      path={`/${LIST_PAGES[dmsKey].path}/new`}
                      render={(routeProps) => (
                        <DynamicPage dmsPage={dmsKey} {...routeProps} />
                      )}
                    />
                  ))}
                  {/* routes for edit data */}
                  {Object.keys(LIST_PAGES).map((dmsKey) => (
                    <Route
                      exact
                      key={dmsKey + "edit"}
                      path={`/${LIST_PAGES[dmsKey].path}/:id/edit`}
                      render={(routeProps) => (
                        <DynamicPage dmsPage={dmsKey} {...routeProps} />
                      )}
                    />
                  ))}
                  {/* routes for delete data */}
                  {Object.keys(LIST_PAGES).map((dmsKey) => (
                    <Route
                      exact
                      key={dmsKey + "delete"}
                      path={`/${LIST_PAGES[dmsKey].path}/:id/delete`}
                      render={(routeProps) => (
                        <DynamicPage dmsPage={dmsKey} {...routeProps} />
                      )}
                    />
                  ))}

                  {/* Handle wildcard url */}
                  <Redirect to="/not-found" />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      )}
    </Router>
  );
};

export default Markup;
