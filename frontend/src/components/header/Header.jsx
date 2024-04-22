import { Button } from '@nextui-org/react'
// import './Header.css'

function Header () {
  return (
    <header className='shadow-md'>
      <nav className='mx-12 flex items-center justify-between font-semibold py-4'>
        <a href='/'>
          <img src='../images/logo-blanc.webp' alt='Logo' className='w-18' />
        </a>
        <div className='flex flex-grow justify-around'>
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
            <Button>
              Connexion
            </Button>
          </a>
        </div>
      </nav>
    </header>

  )
}

export default Header
