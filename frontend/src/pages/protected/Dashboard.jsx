import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import { Button } from '@nextui-org/react'
import { useFetch } from '../../hooks/Api'
import ArtisanDashboard from '../../components/artisan/ArtisanDashboard'

function Dashboard () {
  const navigate = useNavigate()

  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/authentication')
  }

  const jwt = window.localStorage.getItem('jwt')
  const headers = {
    Authorization: `Bearer ${jwt}`,
    'Content-Type': 'application/json'
  }
  const { response, error, loading } = useFetch(`${process.env.REACT_APP_API_URL}/users/me`, { headers })
  if (loading) return <h1>Chargement ...</h1>
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>

  return (
    <div className='mx-40 my-20 text-justify'>
      <h1 className='font-semibold text-4xl flex mb-10'>Dashboard</h1>
      <ArtisanDashboard attributes={response} />
      <Button onClick={handleLogout}>
        Se déconnecter
      </Button>
    </div>
  )
}

export default Dashboard
