/*
import UserProfile from '../components/user/UserProfile'
import { useFetch } from '../hooks/Api'

function Profile () {
  // const jwt = window.localStorage.getItem('jwt')
  
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)
      try {
        // Préparation de la config de Fetch
        let fetchConfig = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        // On regarde si on a un token d'enregistré et si c'est le cas, on lance la requête avec, sinon on ne l'ajoute juste pas
        const savedAuth = window.localStorage.getItem('AUTH')
        if (savedAuth) {
          const auth = JSON.parse(savedAuth)
          fetchConfig.headers.Authorization = 'Bearer ' + auth.jwt
        }
        const _response = await fetch(url, fetchConfig)
        const _responseJSON = await _response.json()
        setResponse(_responseJSON.data)
        setIsLoading(false)
      } catch (error) {
        console.error(error)
        setError(error)
        setIsLoading(false)
      }
    }
    getData()
  }, [url])
  const headers = {
    Authorization: `Bearer ${jwt}`,
    'Content-Type': 'application/json'
  }

  const { response, error, loading } = useFetch(`${process.env.REACT_APP_API_URL}/users/me`, { headers })

  if (loading) return <h1>Chargement ...</h1>
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>

  console.log(response)
  console.log(error)

  return response && (
    <div className='mx-40 my-20 text-justify'>
      <h1 className='font-semibold text-4xl flex'>Profil</h1>
      <UserProfile attributes={response} />
    </div>
  )
}

export default Profile */

import UserProfile from '../components/user/UserProfile'

function Profile () {
  return (
    <div className='mx-40 my-20 text-justify'>
      <h1 className='font-semibold text-4xl flex'>Profil</h1>
      <UserProfile />
    </div>
  )
}

export default Profile
