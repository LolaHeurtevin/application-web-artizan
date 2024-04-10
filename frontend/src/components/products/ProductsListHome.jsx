import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

function ProductsListHome ({ product }) {
  const { name, description, price, images } = product.attributes

  const imgUrl = process.env.REACT_APP_BASE_URL + images?.data[0]?.attributes?.url

  const [currentPageUrl, setCurrentPageUrl] = useState('')
  useEffect(() => {
    // Récupérer l'URL de la page
    setCurrentPageUrl(window.location.href)
  }, [])
  console.log(currentPageUrl)

  // si on est sur la page Home
  if (currentPageUrl === process.env.REACT_APP_BASE_URL + '/home') {
    <>
      <div className='px-5 py-2.5 shadow-md'>
        <h3>{name}</h3>
        <img className='product-picture' src={imgUrl} />
        <p>{description}</p>
        <img
          src=''
          className=''
        />
        <p>{price}€</p>
      </div>
    </>
  }

  // si on est sur la page Artisan
  return (
    <>
      <div className='px-5 py-2.5 shadow-md'>
        <h3>{name}</h3>
        <img className='product-picture' src={imgUrl} />
        <p>{description}</p>
        <p>{price}€</p>
      </div>
    </>
  )
}

ProductsListHome.propTypes = {
  product: PropTypes.object
}

export default ProductsListHome
