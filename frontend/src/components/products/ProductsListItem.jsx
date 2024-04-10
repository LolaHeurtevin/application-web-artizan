import PropTypes from 'prop-types'

function ProductsListItem ({ product }) {
  const { name, description, price, images } = product.attributes

  console.log(images)

  const imgUrl = process.env.REACT_APP_BASE_URL + images?.data[0]?.attributes?.url
  return (
    <>
      <div className='px-5 py-2.5 shadow-lg rounded-lg flex flex-col flex-wrap w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 items-center max-w-72'>
        <img className='size-52' src={imgUrl} />
        <h3 className='font-semibold text-lg'>{name}</h3>
        <p>{description}</p>
        <p className='text-slate-500 font-semibold text-xl'>{price}€</p>
      </div>
    </>
  )
}

ProductsListItem.propTypes = {
  product: PropTypes.object
}

export default ProductsListItem
