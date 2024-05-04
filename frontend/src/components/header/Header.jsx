import { Button } from '@nextui-org/react'
import { useAuth } from '../../context/authContext'

function Header () {
  const { state: { jwt } } = useAuth()

  return (
    <header>
      <div className='shadow-md'>
        <nav className='mx-12 flex items-center justify-between font-semibold py-4 flex-wrap'>
          <a href='/'>
            <img src='../images/logo-blanc.webp' alt='Logo' className='w-18' />
          </a>
          <div className='flex flex-grow justify-around flex-wrap gap-5'>
            <a href='/'>Home</a>
            <a href='/artisans'>Artisans</a>
            <a href='/about'>About</a>
            <a href='/services'>Services</a>
            <a href='/contact'>Contact</a>
            <a href='/profile'>Profile</a>
            <a href='/cart'>
              <img src='../images/cart.webp' alt='Cart' className='w-10' />
            </a>
            <a href='/authentication'>
              {
                jwt
                  ? <Button className='bg-blue-900 text-white font-semibold'>Dashboard</Button>
                  : <Button className='bg-blue-900 text-white font-semibold'>Connexion</Button>
              }
            </a>
          </div>
        </nav>
      </div>
      <img src='../images/banniere-croped.jpg' alt="Une artisane à l'oeuvre" className='maw-h-80' />
    </header>

  )
}

export default Header
