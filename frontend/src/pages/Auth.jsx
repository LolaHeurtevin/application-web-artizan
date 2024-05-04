import { useEffect, useState } from 'react'
import RegisterForm from '../components/forms/RegisterForm'
import LoginForm from '../components/forms/LoginForm'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'

function Auth () {
  const [isRegister, setIsRegister] = useState(false)
  const navigate = useNavigate()

  const { state: { jwt, user } } = useAuth()

  useEffect(() => {
    if (jwt && user) {
      navigate('/dashboard')
    }
  }, [])

  return (
    <div className='mx-10 md:mx-20 lg:mx-40  my-10 text-justify'>
      {
                isRegister
                  ? <RegisterForm />
                  : <LoginForm />
            }
      <a className='my-5' onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "J'ai déjà un compte" : "Je n'ai pas de compte"}
      </a>
    </div>
  )
}
export default Auth
