import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query';
import { App } from './pages/App';
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
  domain="dev-aw11eersfh2kqbzz.us.auth0.com"
  clientId="VDMm90MVVm2ckSnq1whteLyYrFnDnLSc"
  authorizationParams={{
    redirect_uri: window.location.origin
  }}
>
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>
  </Auth0Provider>,
  
);