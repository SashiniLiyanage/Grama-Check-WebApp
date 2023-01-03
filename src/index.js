import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from "@asgardeo/auth-react";
import { TokenExchangePlugin } from "@asgardeo/token-exchange-plugin";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const config = {
  signInRedirectURL: "https://sashiniliyanage.github.io/Grama-Check-WebApp",
  signOutRedirectURL: "https://sashiniliyanage.github.io/Grama-Check-WebApp/login",
  clientID: "BSkuHRd08YqAFxKKmTr_fRh99Tka",
  baseUrl: "https://api.asgardeo.io/t/gramacheckauth",
  scope: ["openid" , "groups", "email", " phone", "profile"],
};

const theme = createTheme({
  palette: {
    primary: {
      main: '#7868E6',
    },
    secondary: {
      main: '#EDEEF7',
    },
    warning: {
      main: '#F18F01',
      contrastText: '#ffffff',
    }
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider config={ config } plugin={ TokenExchangePlugin.getInstance() }>
      <React.StrictMode>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
      </React.StrictMode>
  </AuthProvider>
  
);