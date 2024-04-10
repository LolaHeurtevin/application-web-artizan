import { Button } from '@nextui-org/react'
import PropTypes from 'prop-types'

function UserProfile ({ attributes }) {
  return (
    <div className='flex flex-row'>
      <div className='flex-col flex-end'>
        <p className='m-5 text-justify'>{attributes.username}</p>
        <p className='m-5 text-justify'>{attributes.email}</p>

        <Button>Supprimer mon compte</Button>
      </div>
    </div>
  )
}

// implémenter la fonctionnalité pour supprimer le compte

UserProfile.propTypes = {
  attributes: PropTypes.object
}

export default UserProfile
