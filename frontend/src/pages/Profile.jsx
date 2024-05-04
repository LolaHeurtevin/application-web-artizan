import UserProfile from '../components/user/UserProfile'

function Profile () {
  return (
    <div className='mx-10 md:mx-20 lg:mx-40 my-10 text-justify'>
      <h1 className='font-semibold text-4xl flex'>Profil</h1>
      <UserProfile />
    </div>
  )
}

export default Profile
