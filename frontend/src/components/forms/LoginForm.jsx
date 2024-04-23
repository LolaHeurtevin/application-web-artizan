import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import { Button, Input } from '@nextui-org/react'

function LoginForm () {
  const [formData, setFormdData] = useState({
    identifier: '',
    password: ''
  })

  const navigate = useNavigate()
  const { state: { user, jwt, error, loading }, login } = useAuth()

  useEffect(() => {
    if (user && jwt) {
      navigate('/dashboard')
    }
  }, [user, jwt])

  const handleChange = (event) => {
    setFormdData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    login(formData)
  }

  return (
    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
      <h1 className='font-semibold text-4xl flex mb-10'>Se connecter</h1>
      <Input
        type='email'
        name='identifier'
        label='Email'
        placeholder='mail@provider.com'
        value={formData.identifier}
        onChange={handleChange}
      />
      <Input
        type='password'
        name='password'
        label='Mot de passe'
        placeholder=''
        value={formData.password}
        onChange={handleChange}
      />
      {
                error && <p style={{ color: 'red' }}>{JSON.stringify(error)}</p>
            }
      <Button
        isLoading={loading}
        type='submit'
      >
        Se connecter
      </Button>
    </form>
  )
}

export default LoginForm
