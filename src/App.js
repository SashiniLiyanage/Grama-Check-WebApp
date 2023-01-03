import React from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { SecureRoute, useAuthContext } from "@asgardeo/auth-react";
import LoginPage from "./Pages/LoginPage";
import NotFoundPage from "./Pages/NotFoundPage";
import Spinner from "./Components/Spinner";
import './App.css';
import DefaultLayout from "./Components/DefaultLayout";

function App() {

    const {signIn} = useAuthContext();
    
    return (
       
        <Router basename="https://sashiniliyanage.github.io/Grama-Check-WebApp">
            <React.Suspense fallback={Spinner}>
            <Switch>
                <Route exact path="/login" name="Login Page" component={LoginPage} />
                <SecureRoute exact path="/" component={DefaultLayout} callback={signIn}/>
                <Route exact path="/*" name="not found" component={NotFoundPage}/>
            </Switch>
            </React.Suspense>
        </Router>
    )
}

export default App;