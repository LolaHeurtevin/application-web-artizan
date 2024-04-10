import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { validateRegisterForm } from '../../services/formAuthValidation'
import { Input, Button } from '@nextui-org/react'
import axios from 'axios'

function RegisterForm () {
  // version simple
  // const [firstName, setFirstName] = useState('')
  // const [lastName, setLastName] = useState('')

  const navigate = useNavigate()

  const [errors, setErrors] = useState({
    firstName: null,
    lastName: null,
    username: null,
    email: null,
    password: null,
    role: null
  })

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    role: 'Author'
  })

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleSumbit = (event) => {
    event.preventDefault()
    const _errors = validateRegisterForm(formData)
    if (_errors) {
      setErrors(_errors)
      console.log(_errors)
    } else {
      console.log('success')
      const response = axios.post(`${process.env.REACT_APP_API_URL}/users`, formData)
      // const response = axios.post(`${process.env.REACT_APP_API_URL}/auth/local/register`, formData)
      navigate('/')
      console.log(response)
      window.alert(`Formulaire soumis : ${formData.firstName} ${formData.lastName}`)
    }
  }

  console.log(formData)

  return (
    <form className='form-container' onSubmit={handleSumbit}>
      <h2>Créer un compte</h2>
      <Input
        name='lastName'
        label='Nom'
        placeholder='Entrez votre nom...'
        value={formData.lastName}
        onChange={handleChange}
        error={errors.lastName}
      />
      <Input
        name='firstName'
        label='Prénom'
        placeholder='Entrez votre prénom...'
        value={formData.firstName}
        onChange={handleChange}
        error={errors.firstName}
      />
      <Input
        name='username'
        label="Nom d'utilisateur"
        placeholder="Entrez votre nom d'utilisateur..."
        value={formData.username}
        onChange={handleChange}
      />
      <Input
        name='email'
        label='Email'
        placeholder='Entrez votre adresse  email...'
        value={formData.email}
        onChange={handleChange}
      />
      <Input
        name='password'
        label='Mot de passe'
        placeholder='Entrez un mot de passe...'
        value={formData.password}
        onChange={handleChange}
      />
      <Button
        type='submit'
      >
        S'enregistrer
      </Button>
    </form>
  )
}

export default RegisterForm
