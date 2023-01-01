import React from "react";
import { useAuthContext } from "@asgardeo/auth-react";
import { useEffect, useState } from "react";
import {HashRouter as Router,Switch,Route,Redirect} from "react-router-dom";
import { createContext} from 'react';

import MenuBar from "./MenuBar";
import DataBasePage from "../Pages/DataBasePage";
import GramaHomePage from "../Pages/GramaHomePage";
import UserHomePage from "../Pages/UserHomePage";
import axios from "axios";
import path from "../config.json"

const infoContext = createContext(null);

export default function DefaultLayout() {
  const {state, getBasicUserInfo, getDecodedIDPIDToken} = useAuthContext();
  const [group, setGroup] = useState(false);
  const [info, setInfo] = useState({})

  let token
  
  useEffect(() => {
      (async () => {
          
          const basicUserInfo = await getBasicUserInfo();
          token =  await getDecodedIDPIDToken();

          console.log(token)

          setInfo(basicUserInfo)
          
          if(basicUserInfo.groups){
              setGroup(true)
          }

          axios.get(`${path[0].url}/all-provinces`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          })

      })();  

  }, [state]);

  return (
    <infoContext.Provider value={info}>
    <Router>
    <MenuBar group={group} info={info}/>
    {group?
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
    </infoContext.Provider>
  );
}

export {infoContext};