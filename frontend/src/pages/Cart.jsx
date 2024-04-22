import { useContext } from 'react'
import CartList from '../components/cart/CartList'
import CartContext from '../context/cartContext'

function Cart () {
  const { localCart } = useContext(CartContext)

  return (
    <div className='mx-40 my-20 text-justify'>
      <h1 className='font-semibold text-4xl flex mb-10'>Panier</h1>
      <CartList itemsList={localCart} />
    </div>
  )
}

export default Cart
