/* import { Input, Button } from '@nextui-org/react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useAuth } from '../../context/authContext'

function UserProfile ({ user }) {
  const { state: { user, jwt } } = useAuth()

  console.log(user)

  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email
  })

  function deleteAccount () {
    try {
      const response = axios.delete(`${process.env.REACT_APP_API_URL}/users/${user.id}`)
      console.log(response)
    } catch {
      throw new Error('Une erreur est survenue')
    }
  }

  const handleSumbit = (event) => {
    event.preventDefault()
    try {
      const response = axios.put(`${process.env.REACT_APP_API_URL}/users/${user.id}`, formData)
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
          value={user.firstName}
        />
        <Input
          className='m-5 text-justify'
          value={user.lastName}
        />
        <Input
          className='m-5 text-justify'
          value={user.username}
        />
        <Input
          className='m-5 text-justify'
          value={user.email}
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
  user: PropTypes.object
}

export default UserProfile */

import { Input, Button } from '@nextui-org/react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useAuth } from '../../context/authContext'

function UserProfile () {
  const { state: { user, jwt } } = useAuth()

  console.log(user)

  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email
  })

  function deleteAccount () {
    try {
      const response = axios.delete(`${process.env.REACT_APP_API_URL}/users/${user.id}`)
      console.log(response)
    } catch {
      throw new Error('Une erreur est survenue')
    }
  }

  const handleSumbit = (event) => {
    event.preventDefault()
    try {
      const response = axios.put(`${process.env.REACT_APP_API_URL}/users/${user.id}`, formData)
      console.log(response)
      window.alert('Vos données ont bien été mises à jour')
    } catch {
      throw new Error('Une erreur est survenue')
    }
  }

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  return (
    <form className='flex flex-row' onSubmit={handleSumbit}>
      <div className='flex-col flex-end'>
        <h2>Vos informations</h2>
        <Input
          name='firstName'
          label='Prénom'
          className='m-5 text-justify'
          value={user.firstName}
          onChange={handleChange}
        />
        <Input
          name='lastName'
          label='Nom'
          className='m-5 text-justify'
          value={user.lastName}
          onChange={handleChange}
        />
        <Input
          name='username'
          label="Nom d'utilisateur"
          className='m-5 text-justify'
          value={user.username}
          onChange={handleChange}
        />
        <Input
          name='email'
          label='Email'
          className='m-5 text-justify'
          value={user.email}
          onChange={handleChange}
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
  user: PropTypes.object
}

export default UserProfile
