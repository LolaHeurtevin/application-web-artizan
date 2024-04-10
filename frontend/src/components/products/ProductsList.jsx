import PropTypes from 'prop-types'
import ProductsListItem from './ProductsListItem'

function ProductsList ({ products }) {
  if (!products || products.length < 1) {
    return 'No data'
  }
  return (
    <>
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
  products: PropTypes.arrayOf(PropTypes.objects)
}

export default ProductsList
