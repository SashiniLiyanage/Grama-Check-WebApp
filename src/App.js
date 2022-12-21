import React, {useEffect} from "react";
import { SecureRoute, useAuthContext } from "@asgardeo/auth-react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import NotFoundPage from "./Pages/NotFoundPage";
import ProtectedRoute from "./Components/ProtectedRoute";

import './App.css'; 


function App() {
  const { signIn } = useAuthContext();

    return (
        <Router>
            <Switch>
                <Route exact path="/" component={ LoginPage } />
                <ProtectedRoute exact path="/home" component={ HomePage } />
                <Route component={NotFoundPage} />
            </Switch>
        </Router>
    )
}

export default App;