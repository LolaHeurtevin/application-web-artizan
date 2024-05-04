import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import { Button } from '@nextui-org/react'
import ArtisanDashboard from '../../components/artisan/ArtisanDashboard'

function Dashboard () {
  const navigate = useNavigate()
  // const [response, setResponse] = useState()

  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/authentication')
  }
  /*
  const headers = {
    Authorization: `Bearer ${jwt}`,
    'Content-Type': 'application/json'
  }

  useEffect(() => {
    const getData = async () => {
      const _response = await axios.get(`${process.env.REACT_APP_API_URL}/users/me`, { headers })
      setResponse(_response.data)
    }
    getData()
  }, []) */

  // if (loading) return <h1>Chargement ...</h1>
  // if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>

  /*
  const [response, setResponse] = useState()

  useEffect(() => {
    const getData = async () => {
      const _response = await axios.get(`${process.env.REACT_APP_API_URL}/artisans?filters[user][id]=7&populate=*`)
      console.log(_response)
      setResponse(_response.data)
    }
    getData()
  }, []) */

  return (
    <div className='mx-40 my-20 text-justify'>
      <h1 className='font-semibold text-4xl flex mb-10'>Dashboard</h1>
      <Button onClick={handleLogout}>
        Se déconnecter
      </Button>
      <div className='mt-5'>
        <h2 className='font-semibold text-2xl flex mt-10 mb-5'>Tableau de bord artisan</h2>
        <ArtisanDashboard />
      </div>
    </div>
  )
}

export default Dashboard
