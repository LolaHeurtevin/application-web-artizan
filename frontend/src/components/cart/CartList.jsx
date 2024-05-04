import PropTypes from 'prop-types'
import CartListItem from './CartListItem'

function CartList ({ itemsList }) {
  if (!itemsList || itemsList.length < 1) {
    return 'Le panier est vide'
  }

  return (
    <div className='flex flex-row flex-wrap gap-4 justify-center'>
      {
        itemsList.map(product => (
          <CartListItem key={product.id} product={product} />
        ))
      }
    </div>
  )
}

CartList.propTypes = {
  itemsList: PropTypes.arrayOf(PropTypes.object)
}

export default CartList
