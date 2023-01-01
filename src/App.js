import React, {useEffect, useState} from "react";
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from "react-router-dom";
import { SecureRoute, useAuthContext } from "@asgardeo/auth-react";
import LoginPage from "./Pages/LoginPage";
import NotFoundPage from "./Pages/NotFoundPage";
import Spinner from "./Components/Spinner";
import './App.css';
import DefaultLayout from "./Components/DefaultLayout";
import { createContext} from 'react';
import qs from 'qs';

import axios from 'axios';
const infoContext = createContext(null);

const TOKEN_EXCHANGE_EP = 'https://sts.choreo.dev/oauth2/token';
const TOKEN_REVOKE_EP = 'https://sts.choreo.dev/oauth2/revoke';
const CONSUMER_KEY = '8bLE3SOO5uuGMsfCYFTLnyE3_zca';
const SUBJECT_TOKEN_TYPE = 'urn:ietf:params:oauth:token-type:jwt';
const GRANT_TYPE = 'urn:ietf:params:oauth:grant-type:token-exchange';

function App() {

    const {signIn} = useAuthContext();
    const {state, getBasicUserInfo, getIDToken} = useAuthContext();
    const [group, setGroup] = useState(false);
    const [info, setInfo] = useState({})

    useEffect(() => {
        (async () => {
            
            const basicUserInfo = await getBasicUserInfo();
            const idToken =  await getIDToken();
  
            console.log(basicUserInfo)
            if(basicUserInfo.groups){
                basicUserInfo["hasGroups"]=true
            }
  
            axios.post(`${TOKEN_EXCHANGE_EP}`, qs.stringify({
              "client_id": CONSUMER_KEY,
              "subject_token_type": SUBJECT_TOKEN_TYPE,
              "grant_type": GRANT_TYPE,
              "subject_token": idToken
            }),{
              headers: {
                "content-type": "application/x-www-form-urlencoded",
              }
            })
            .then(function (response) {
              basicUserInfo["access_token"] = response.data.access_token;
              basicUserInfo["refresh_token"] = response.data.refresh_token;
              setInfo(basicUserInfo)
            })
            .catch(function (error) {
              console.log(error);
            })
  
        })();  
       
  
    }, [state]);

    return (
        <infoContext.Provider value={info}>
        <Router>
            <React.Suspense fallback={Spinner}>
            <Switch>
                <Route exact path="/login" name="Login Page" component={LoginPage} />
                <SecureRoute exact path="/" component={DefaultLayout} callback={signIn}/>
                <Route exact path="/*" name="not found" component={NotFoundPage}/>
            </Switch>
            </React.Suspense>
        </Router>
        </infoContext.Provider>
    )
}

export default App;
export {infoContext};