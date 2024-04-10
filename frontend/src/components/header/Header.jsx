import { Button } from '@nextui-org/react'
// import './Header.css'

function Header () {
  return (
    <header>
      <nav className='flex items-center justify-between font-semibold py-4'>
        <img src='../images/logo-blanc.webp' alt='Logo' className='w-18' />
        <div className='flex flex-grow justify-around'>
          <a href='/'>Home</a>
          <a href='/artisans'>Artisans</a>
          <a href='/about'>About</a>
          <a href='/services'>Services</a>
          <a href='/contact'>Contact</a>
          <a href='/profile'>Profile</a>
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
