import React, { useEffect, createContext, useState} from "react";
import {HashRouter as Router,Switch,Route,Redirect} from "react-router-dom";
import Spinner from "./Spinner";
import MenuBar from "./MenuBar";
import DataBasePage from "../Pages/DataBasePage";
import GramaHomePage from "../Pages/GramaHomePage";
import UserHomePage from "../Pages/UserHomePage";
import qs from 'qs';
import axios from 'axios';
import {useAuthContext } from "@asgardeo/auth-react";

const infoContext = createContext(null);

const TOKEN_EXCHANGE_EP = 'https://sts.choreo.dev/oauth2/token';
// const TOKEN_REVOKE_EP = 'https://sts.choreo.dev/oauth2/revoke';
const CONSUMER_KEY = '8bLE3SOO5uuGMsfCYFTLnyE3_zca';
const SUBJECT_TOKEN_TYPE = 'urn:ietf:params:oauth:token-type:jwt';
const GRANT_TYPE = 'urn:ietf:params:oauth:grant-type:token-exchange';

export default function DefaultLayout() {

  const {state, getBasicUserInfo, getIDToken} = useAuthContext();
  const [info, setInfo] = useState({});
  const [isLoading, setIsloading] = useState(true);
  const [hasGroups, setHasGroups] = useState(false)


  useEffect(() => {
      (async () => {
        
        const basicUserInfo = await getBasicUserInfo();
        const idToken =  await getIDToken();

        if(basicUserInfo.groups){
            basicUserInfo["hasGroups"]=true
            setHasGroups(true)
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
        }).finally(function () {
            setIsloading(false)
        });
        
    })().catch((e)=>{
      console.log(e)
    })

  }, [state]);

  return (
    <infoContext.Provider value={info}>
    {isLoading?<Spinner/>:
    <Router>
    <MenuBar info={info}/>
    {hasGroups?
      <Switch>
        <Route exact path="/requests" component={GramaHomePage}/>
        <Route exact path="/database" component={DataBasePage}/>
        <Redirect to="/requests" from="/"/>
      </Switch>
      :
      <Switch>
        <Route exact path="/home" component={UserHomePage}/>
        <Redirect to="/home" from="/"/>
      </Switch>
    }
    </Router>
    }
    </infoContext.Provider>
  );
}

export {infoContext};