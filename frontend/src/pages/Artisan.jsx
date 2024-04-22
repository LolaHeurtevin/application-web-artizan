import { useParams } from 'react-router-dom'
import { useFetch } from '../hooks/Api'
import ArtisanHeader from '../components/artisan/ArtisanHeader'
import ProductsList from '../components/products/ProductsList'

function Artisan () {
  const { artisanSlug } = useParams()

  // récupère les artisans via l'api
  const { response, error, loading } = useFetch(`${process.env.REACT_APP_API_URL}/artisans?filters[slug][$eq]=${artisanSlug}&populate=*`)

  // récupère les produits via l'api
  const { response: products, error: productsError, loading: productsLoading } = useFetch(`${process.env.REACT_APP_API_URL}/products?filters[artisan][slug][$eq]=${artisanSlug}&populate=*`)

  if (loading || productsLoading) return <h1>Chargement ...</h1>
  if (error || productsError) return <pre>{JSON.stringify(error, null, 2)}</pre>

  return response && (
    <div className='mx-40 my-20 text-justify'>
      <ArtisanHeader attributes={response[0]?.attributes} /* response est un tableau, ? autorise que la value soit null */ />
      {
        products
          ? (
            <ProductsList products={products} />
            )
          : <p>Aucun produit trouvé</p>
      }
    </div>

  )
}

export default Artisan
