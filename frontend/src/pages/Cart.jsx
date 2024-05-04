import CartList from '../components/cart/CartList'
import { useCart } from '../context/cartContext'

function Cart () {
  const { state } = useCart()

  return (
    <div className='mx-10 md:mx-20 lg:mx-40  my-10 text-justify'>
      <h1 className='font-semibold text-4xl flex mb-10'>Panier</h1>
      <CartList itemsList={state.cart} />
    </div>
  )
}

export default Cart
