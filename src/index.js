import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import routes from "./store/routes";
import Header from "./components/Header/Header";
import './styles.scss';
import './thirdparty/fontawesome';
import protectedRoutes from './store/protectedRoutes';
import * as firebase from "firebase";
import firebaseConfig from "./store/base";
import ProtectedRouteHoc from './store/ProtectedRouteHoc';

firebase.initializeApp(firebaseConfig);
const STATE_KEY = `firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`;

export const AuthContext = React.createContext(null);

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  function readSession() {
    const user = window.sessionStorage.getItem(STATE_KEY);
		if (user) setLoggedIn(true);
  }

  useEffect(() => {
    readSession()
  }, [])

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      {/*remove later*/}
      {/*<div>Is logged in? {JSON.stringify(isLoggedIn)}</div>*/}
      {/*remove later*/}

      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn}/>

        <Switch>
          {protectedRoutes.map(route => (
            <ProtectedRouteHoc
              key={route.path}
              isLoggedIn={isLoggedIn}
              path={route.path}
              component={route.main}
              exact={route.exact}
              public={route.public}
            />
          ))}
          {routes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact}
              component={route.main}
            />
          ))}
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
