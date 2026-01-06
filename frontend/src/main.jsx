import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router";
import {store} from "./store/store"
import {Provider} from "react-redux"
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>
)
