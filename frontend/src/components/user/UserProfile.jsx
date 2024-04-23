import { Input, Button } from '@nextui-org/react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useAuth } from '../../context/authContext'

function UserProfile ({ attributes }) {
  const { state: { user, jwt, error, loading }} = useAuth()

  const [formData, setFormData] = useState({
    firstName: attributes.firstName,
    lastName: attributes.lastName,
    username: attributes.username,
    email: attributes.email
  })

  function deleteAccount () {
    try {
      const response = axios.delete(`${process.env.REACT_APP_API_URL}/users/${attributes.id}`)
      console.log(response)
    } catch {
      throw new Error('Une erreur est survenue')
    }
  }

  const handleSumbit = (event) => {
    event.preventDefault()
    try {
      const response = axios.put(`${process.env.REACT_APP_API_URL}/users/${attributes.id}`, formData)
      console.log(response)
      window.alert('Vos données ont bien été mises à jour')
    } catch {
      throw new Error('Une erreur est survenue')
    }
  }

  return (
    <form className='flex flex-row' onSubmit={handleSumbit}>
      <div className='flex-col flex-end'>
        <h2>Vos informations</h2>
        <Input
          className='m-5 text-justify'
          value={attributes.firstName}
        />
        <Input
          className='m-5 text-justify'
          value={attributes.lastName}
        />
        <Input
          className='m-5 text-justify'
          value={attributes.username}
        />
        <Input
          className='m-5 text-justify'
          value={attributes.email}
        />
        <Button
          type='submit'
        >
          Enregistrer
        </Button>

        <Button
          onClick={deleteAccount}
        >
          Supprimer mon compte
        </Button>
      </div>
    </form>
  )
}

UserProfile.propTypes = {
  attributes: PropTypes.object
}

export default UserProfile
