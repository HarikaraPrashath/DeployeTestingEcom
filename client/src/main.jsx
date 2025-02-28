import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthContextProvider } from './context/authContext.jsx'
import { OrderContextProvider } from './context/orderPlacement.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <OrderContextProvider>
          <App />
      </OrderContextProvider>
    </AuthContextProvider>
  </StrictMode>
)
