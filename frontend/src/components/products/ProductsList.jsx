import PropTypes from 'prop-types'
import ProductsListItem from './ProductsListItem'

function ProductsList ({ products }) {
  if (!products || products.length < 1) {
    return 'No data'
  }
  return (
    <>
      <h2 className='text-2xl text-bold mt-10 mb-5'>Tous les produits</h2>
      <div className='flex flex-row flex-wrap gap-4 justify-center'>
        {
          products.map(product => (
            <ProductsListItem key={product.id} product={product} />
          ))
        }
      </div>
    </>
  )
}

ProductsList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object)
}

export default ProductsList
