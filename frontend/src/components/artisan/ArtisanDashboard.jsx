import PropTypes from 'prop-types'
import { Button, Input } from '@nextui-org/react'
import { useBackoffice } from '../../context/backofficeContext'
import { useState } from 'react'
import { useAuth } from '../../context/authContext'

function ArtisanDashboard ({ attributes }) {
  const { addProduct } = useBackoffice()
  const { loading } = useAuth()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: ''
  })

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleSumbit = (event) => {
    event.preventDefault()
    addProduct(formData)
  }

  return (
    <form className='flex flex-col gap-4' onSubmit={handleSumbit}>
      <Input
        name='name'
        label='Nom du produit'
        value={formData.name}
        onChange={handleChange}
      />
      <Input
        name='description'
        label='Description'
        value={formData.description}
        onChange={handleChange}
      />
      <Input
        name='price'
        label='Prix'
        value={formData.username}
        onChange={handleChange}
      />
      <Button
        type='submit'
        isLoading={loading}
      >Ajouter un produit
      </Button>
    </form>
  )
}

ArtisanDashboard.propTypes = {
  attributes: PropTypes.object
}

export default ArtisanDashboard
