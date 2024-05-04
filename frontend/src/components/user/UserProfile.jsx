import { Input, Button } from '@nextui-org/react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function UserProfile () {
  const { state: { user, jwt }, loading, logout } = useAuth()

  console.log(user)

  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email
  })

  /*
  function deleteAccount () {
    try {
      const response = axios.delete(`${process.env.REACT_APP_API_URL}/users/${user.id}`, headers)
      logout()
      console.log(response)
    } catch (error) {
      console.error(error)
      toast.error('Une erreur est survenue lors de la suppression de votre compte')
      throw new Error('Une erreur est survenue lors de la suppression de votre compte')
    }
  } */

  const navigate = useNavigate()

  const handleDeleteAccount = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/users/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        })
      logout()
      useEffect(() => {
        if (!user || !jwt) {
          navigate('/dashboard')
        }
      }, [user, jwt])
    } catch (error) {
      console.error(error)
      toast.error('Une erreur est survenue lors de la suppression de votre compte')
      throw new Error('Une erreur est survenue lors de la suppression de votre compte')
    }
  }

  const handleSumbit = async (event) => {
    event.preventDefault()
    console.log(jwt)
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/users/${user.id}`,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          username: formData.username,
          email: formData.email
        }, {
          headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        })
      toast.success('Vos données ont bien été mises à jour')
    } catch (error) {
      console.error(error)
      throw new Error('Une erreur est survenue lors de la mise à jour des données')
    }
  }

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  return (
    <>
      <h2 className='font-semibold text-2xl flex mt-10 mb-5'>Vos informations</h2>
      <form className='flex flex-col size-fit' onSubmit={handleSumbit}>
        <Input
          name='firstName'
          label='Prénom'
          className='mt-4 text-justify'
          value={formData.firstName}
          onChange={handleChange}
        />
        <Input
          name='lastName'
          label='Nom'
          className='mt-4 text-justify'
          value={formData.lastName}
          onChange={handleChange}
        />
        <Input
          name='username'
          label="Nom d'utilisateur"
          className='mt-4 text-justify'
          value={formData.username}
          onChange={handleChange}
        />
        <Input
          name='email'
          label='Email'
          className='mt-4 text-justify'
          value={formData.email}
          onChange={handleChange}
        />
        <Button
          type='submit'
          isLoading={loading}
          className='mt-4'
        >
          Enregistrer
        </Button>

        <Button
          onClick={handleDeleteAccount}
          isLoading={loading}
          className='mt-4'
        >
          Supprimer mon compte
        </Button>
      </form>
    </>
  )
}

UserProfile.propTypes = {
  user: PropTypes.object
}

export default UserProfile
