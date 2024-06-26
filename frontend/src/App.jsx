import { NextUIProvider } from '@nextui-org/react'
import Header from './components/header/Header'
import { AuthProvider } from './context/authContext.jsx'
import Router from './navigation/Router.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CartProvider } from './context/cartContext.jsx'

function App () {
  return (
    <>
      <NextUIProvider>
        <AuthProvider>
          <CartProvider>
            <Header />
            <Router />
            <ToastContainer />
          </CartProvider>
        </AuthProvider>
      </NextUIProvider>
    </>
  )
}

export default App
