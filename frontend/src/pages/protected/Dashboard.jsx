import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import { Button } from '@nextui-org/react'
import ArtisanDashboard from '../../components/artisan/ArtisanDashboard'
import { getArtisanInfos } from '../../services/api'
import { useEffect, useState } from 'react'

function Dashboard () {
  const navigate = useNavigate()
  const [response, setResponse] = useState()

  const { state: { user }, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/authentication')
  }

  useEffect(() => {
    const getData = async () => {
      const _response = await getArtisanInfos(user.id)
      setResponse(_response)
    }
    getData()
  }, [])

  console.log(response)

  return (
    <div className='mx-40 my-20 text-justify'>
      <h1 className='font-semibold text-4xl flex mb-10'>Dashboard</h1>
      <Button
        onClick={handleLogout}
        className='bg-blue-900 text-white font-semibold'
      >
        Se déconnecter
      </Button>
      {
        response && response.data && response.data.length > 0
          ? (
            <div className='mt-5'>
              <h2 className='font-semibold text-2xl flex mt-10 mb-5'>Tableau de bord artisan</h2>
              <ArtisanDashboard />
            </div>)
          : (<p className='mt-5'>Vous voulez vendre vos produits ? Créez vous un compte artisan !</p>)
    }
    </div>
  )
}

export default Dashboard
