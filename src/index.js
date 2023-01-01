import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from "@asgardeo/auth-react";
import { TokenExchangePlugin } from "@asgardeo/token-exchange-plugin";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const config = {
  signInRedirectURL: "https://localhost:3000",
  signOutRedirectURL: "https://localhost:3000/login",
  clientID: "BSkuHRd08YqAFxKKmTr_fRh99Tka",
  baseUrl: "https://api.asgardeo.io/t/gramacheckauth",
  scope: ["openid" , "groups", "email", " phone", "profile"],
  stsConfig: {
    client_id: "CjMYkX01vWxU_3IL96txBCQqmRwa",
    orgHandle: "esaras"
  },
  stsTokenEndpoint: "https://sts.choreo.dev/oauth2/token",
  resourceServerURLs: "https://ca1fe6c9-8d82-4f45-823b-269122b35482-prod.e1-us-east-azure.choreoapis.dev/qfon/integrator-api/1.0.0"
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