import React, { Suspense, lazy } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const MainPage = lazy(() => import("./components/MainPage/"));
const SettingsContainer = lazy(() => import("./components/Settings/"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <div className="App">
            <Route exact path="/" component={MainPage} />
            <Route path="/settings" component={SettingsContainer} />
          </div>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
