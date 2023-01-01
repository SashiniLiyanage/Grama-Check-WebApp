import React, {useContext} from "react";
import {HashRouter as Router,Switch,Route,Redirect} from "react-router-dom";
import {infoContext} from '../App';

import MenuBar from "./MenuBar";
import DataBasePage from "../Pages/DataBasePage";
import GramaHomePage from "../Pages/GramaHomePage";
import UserHomePage from "../Pages/UserHomePage";

export default function DefaultLayout() {

  const info = useContext(infoContext)

  return (
    
    <Router>
    <MenuBar group={info.hasGroups} info={info}/>
    {info.hasGroups?
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
  );
}