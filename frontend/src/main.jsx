import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { RouterProvider } from 'react-router-dom'
import { router } from './Router'
import { store } from './Store/store'
import { Provider } from 'react-redux'
import { initializeApp } from './utils/initialize';

initializeApp();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="29910149161-o1pdu2g2t2cdv0ng91t6flkb537rbfem.apps.googleusercontent.com">    
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </GoogleOAuthProvider>    
  </StrictMode>,
)
