import UserProfile from '../components/user/UserProfile'
import { useFetch } from '../hooks/Api'

function Profile () {
  const jwt = window.localStorage.getItem('jwt')
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

export default Profile
