import { NextUIProvider } from '@nextui-org/react'
import './App.css'
import Header from './components/header/Header'
import { AuthProvider } from './context/authContext.jsx'
import Router from './navigation/Router.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CartProvider } from './context/cartContext.jsx'
import { BackofficeProvider } from './context/backofficeContext.jsx'

function App () {
  return (
    <>
      <NextUIProvider>
        <AuthProvider>
          <BackofficeProvider>
            <CartProvider>
              <Header />
              <Router />
              <ToastContainer />
            </CartProvider>
          </BackofficeProvider>
        </AuthProvider>
      </NextUIProvider>
    </>
  )
}

export default App
