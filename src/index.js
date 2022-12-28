import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from "@asgardeo/auth-react";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const config = {
  signInRedirectURL: "https://localhost:3000",
  signOutRedirectURL: "https://localhost:3000/login",
  clientID: "BSkuHRd08YqAFxKKmTr_fRh99Tka",
  baseUrl: "https://api.asgardeo.io/t/gramacheckauth",
  scope: ["openid" , "groups", " phone", "profile"]
};

const theme = createTheme({
  palette: {
    primary: {
      main: '#7868E6',
    },
    secondary: {
      main: '#11cb5f',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider config={ config }>
      <React.StrictMode>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
      </React.StrictMode>
  </AuthProvider>
  
);