import { Route, Routes, BrowserRouter } from 'react-router-dom'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Services from '../pages/Services'
import Artisans from '../pages/Artisans'
import Home from '../pages/Home'
import Artisan from '../pages/Artisan'
import Auth from '../pages/Auth'
import Dashboard from '../pages/protected/Dashboard'
import PrivateRoute from './PrivateRouteMiddleware'
import UserProfile from '../components/user/UserProfile'

function Router () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='artisans'>
          <Route index element={<Artisans />} /> {/* Route <domaine>/artisans */}
          <Route path=':artisanSlug' element={<Artisan />} /> {/* Route <domaine>/artisans/<ID> */}
        </Route>
        <Route path='about' element={<About />} />
        <Route path='contact' element={<Contact />} />
        <Route path='services' element={<Services />} />
        <Route path='authentication' element={<Auth />} />
        <Route path='/dashboard' element={<PrivateRoute />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path='profile' element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
