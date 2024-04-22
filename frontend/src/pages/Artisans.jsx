import ArtisansList from '../components/artisans/ArtisansList'
import { useFetch } from '../hooks/Api'

function Artisans () {
  const { response, error, isLoading } = useFetch(process.env.REACT_APP_API_URL + '/artisans?populate=*')

  if (isLoading) return <h2>Chargement...</h2>
  if (error) return <pre>{JSON.springify(error, null, 2)}</pre>

  return (
    <div className='mx-40 my-20 text-justify'>
      <h1 className='font-semibold text-4xl flex mb-10'>Nos artisans</h1>
      <ArtisansList artisans={response} />
    </div>
  )
}

export default Artisans
