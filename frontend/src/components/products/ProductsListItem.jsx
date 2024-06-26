import PropTypes from 'prop-types'
import { Button } from '@nextui-org/react'
import { useCart } from '../../context/cartContext'

function ProductsListItem ({ product }) {
  const { name, description, price, images } = product.attributes

  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(product)
  }

  const imgUrl = images && images.data && images.data[0] ? process.env.REACT_APP_BASE_URL + images?.data[0]?.attributes?.url : null

  return (
    <>
      <div className='px-5 py-2.5 shadow-lg rounded-lg flex flex-col flex-wrap w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 items-center max-w-72'>
        {
          imgUrl && <img className='w-16 md:w-32 lg:w-48' src={imgUrl} />
        }
        <h3 className='font-semibold text-lg'>{name}</h3>
        <p>{description}</p>
        <p className='text-slate-500 font-semibold text-xl'>{price}€</p>
        <Button
          onClick={handleAddToCart}
          className='bg-blue-300'
        >
          Ajouter au panier
        </Button>
      </div>
    </>
  )
}

ProductsListItem.propTypes = {
  product: PropTypes.object
}

export default ProductsListItem
