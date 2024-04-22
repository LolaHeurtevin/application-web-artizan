import PropTypes from 'prop-types'
import CartListItem from './CartListItem'

function CartList ({ itemsList }) {
  if (!itemsList || itemsList.length < 1) {
    return 'Le panier est vide'
  }

  return (
    <>
      <div className='flex flex-col'>
        <h2 className='text-4xl py-6'>Cart Product List</h2>
        <div className='flex flex-row flex-wrap gap-4'>
          {
                    itemsList.map(product => (
                      <CartListItem key={product.id} product={product} />
                    ))
                }
        </div>
      </div>
    </>
  )
}

/*
<div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCart(cart + 1)}>
        Click me
      </button>
    </div>
*/

CartList.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.object)
}

export default CartList
