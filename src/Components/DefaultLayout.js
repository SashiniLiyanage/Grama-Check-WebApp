import React from "react";
import { useAuthContext } from "@asgardeo/auth-react";
import { useEffect, useState } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import MenuBar from "./MenuBar";
import PreviewPage from "../Pages/PreviewPage";
import DataBasePage from "../Pages/DataBasePage";
import GramaHomePage from "../Pages/GramaHomePage";
import UserHomePage from "../Pages/UserHomePage";

export default function DefaultLayout() {
  const {state, getBasicUserInfo} = useAuthContext();
  const [group, setGroup] = useState(false);
  const [info, setInfo] = useState({})
  
  useEffect(() => {
      (async () => {
          
          const basicUserInfo = await getBasicUserInfo();
          setInfo(basicUserInfo)
          
          if(basicUserInfo.groups){
              setGroup(true)
          }
      })();   

  }, [state]);

  return (
    <>
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
    </>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function Topics() {
  return (
    <div>
      <h2>Topics</h2>
    </div>
  );

}