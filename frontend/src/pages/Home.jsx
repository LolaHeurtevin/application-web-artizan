import ProductsList from '../components/products/ProductsList'
import { useFetch } from '../hooks/Api'

function Home () {
  // récupère la photo des artisans
  // const { response, error, loading } = useFetch(`${process.env.REACT_APP_API_URL}/products?&populate[0]=artisan&fields[0]=id`)
  // http://localhost:1337/api/products?&populate[0]=artisan&fields[0]=id

  // récupère les produits
  // const { response, error, loading } = useFetch(`${process.env.REACT_APP_API_URL}/products?&populate=*`)

  // récupère les produits
  const { response, error, loading } = useFetch(`${process.env.REACT_APP_API_URL}/products?populate[0]=images&populate[1]=artisan.profilePicture&sort=price:asc`)

  if (loading) return <h1>Chargement ...</h1>
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>

  return response && (
    <div className='mx-40 my-20 text-justify'>
      <h1 className='font-semibold text-4xl flex'>Home</h1>
      <ProductsList products={response} />
    </div>
  )
}

export default Home
