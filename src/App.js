import React from "react";
import { useAuthContext } from "@asgardeo/auth-react";
import LoginPage from './Components/LoginPage'
import './App.css'; 

function App() {

  const { state, signIn, signOut } = useAuthContext();

  return (
    <div className="App">
      {
        state.isAuthenticated
          ? (
            <div>
              <ul>
                <li>{state.username}</li>
              </ul>

              <button onClick={() => signOut()}>Logout</button>
            </div>
          )
          : (
            <LoginPage/>
          )
      }
    </div>
  );
}

export default App;