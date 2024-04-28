import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { validateRegisterForm } from '../../services/formAuthValidation'
import { Input, Button, Checkbox } from '@nextui-org/react'
import { useAuth } from '../../context/authContext'

function RegisterForm () {
  // version simple
  // const [firstName, setFirstName] = useState('')
  // const [lastName, setLastName] = useState('')

  const navigate = useNavigate()
  const { state: { user, jwt, error, loading }, register } = useAuth()

  useEffect(() => {
    if (user && jwt) {
      navigate('/dashboard')
    }
  }, [user, jwt])

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    isArtisan: false,
    role: 'Authenticated'
  })

  /*
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  } */

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target
    const newValue = type === 'checkbox' ? checked : value

    setFormData({
      ...formData,
      [name]: newValue
    })
  }

  /*
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
  } */

  const handleSumbit = (event) => {
    event.preventDefault()
    console.log('success')
    register(formData)
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
      />
      <Input
        name='firstName'
        label='Prénom'
        placeholder='Entrez votre prénom...'
        value={formData.firstName}
        onChange={handleChange}
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
      <Checkbox
        name='isArtisan'
        value={formData.isArtisan}
        onChange={handleChange}
      >Je souhaite m'inscrire en tant qu'artisan
      </Checkbox>
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
