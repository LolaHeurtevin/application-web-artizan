import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { validateRegisterForm } from '../../services/formAuthValidation'
import { Input, Button } from '@nextui-org/react'
import { useAuth } from '../../context/authContext'

function RegisterForm () {
  // version simple
  // const [firstName, setFirstName] = useState('')
  // const [lastName, setLastName] = useState('')

  const navigate = useNavigate()
  const { state: { error, loading }, register } = useAuth()

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
    role: 'Authenticated'
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
    console.log('_errors')
    console.log(_errors)
    if (_errors) {
      setErrors(_errors)
      console.log(_errors)
    } else {
      console.log('success')
      register(formData)
      // const response = axios.post(`${process.env.REACT_APP_API_URL}/users`, formData)
      // const response = axios.post(`${process.env.REACT_APP_API_URL}/auth/local/register`, formData)
      navigate('/')
      // console.log(response)
      window.alert(`Formulaire soumis : ${formData.firstName} ${formData.lastName}`)
    }
  }

  console.log(formData)

  return (
    <form className='flex flex-col gap-4' onSubmit={handleSumbit}>
      <h1 className='font-semibold text-4xl flex mb-10'>Créer un compte</h1>
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
      {
                error && <p style={{ color: 'red' }}>{JSON.stringify(error)}</p>
            }
      <Button
        type='submit'
        isLoading={loading}
      >
        S'enregistrer
      </Button>
    </form>
  )
}

export default RegisterForm
