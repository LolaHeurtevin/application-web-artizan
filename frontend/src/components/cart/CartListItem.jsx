import PropTypes from 'prop-types'
import { useCart } from '../../context/cartContext'
import { Button } from '@nextui-org/react'

function CartListItem ({ product }) {
  if (!product || product.length < 1) {
    return 'No data'
  }
  const { name, price, images } = product.attributes
  const imgUrl = process.env.REACT_APP_BASE_URL + images?.data[0]?.attributes?.url

  const { deleteFromCart } = useCart()

  const handleDeleteFromCart = () => {
    deleteFromCart(product)
  }

  return (
    <>
      <div className='px-5 py-2.5 shadow-lg rounded-lg flex flex-col flex-wrap w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 items-center max-w-72'>
        <img className='w-16 md:w-32 lg:w-48' src={imgUrl} />
        <h3 className='font-semibold text-lg'>{name}</h3>
        <p className='text-slate-500 font-semibold text-xl'>{price}€</p>
        <Button onClick={handleDeleteFromCart}>Supprimer de panier</Button>
      </div>
    </>
  )
}

CartListItem.propTypes = {
  product: PropTypes.object
}

export default CartListItem

/*
 const [cart, setCart] = useState([])
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCart(cart + 1)}>
        Click me
      </button>
    </div>
  )

  ////////////

  <Card as={Link} className='max-w-[400px]' href={`/products/${slug}`}>
      <CardHeader className='p-0'>
        <img
          src={imgUrl}
          classname='profile-picture'
        />
      </CardHeader>
      <CardBody className='flex flex-col gap-4'>
        <h3 className='font-semibold text-3xl'>{name}</h3>
        <p>{price}</p>
      </CardBody>
    </Card>
*/
