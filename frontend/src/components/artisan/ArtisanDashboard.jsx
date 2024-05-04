import PropTypes from 'prop-types'
import { Button, Input } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext'
import { createProduct, getArtisanInfos, getArtisanProducts } from '../../services/api'
import ProductDeleteUpdate from '../products/ProductDeleteUpdate'
import { toast } from 'react-toastify'

function ArtisanDashboard () {
  const { state: { user, jwt }, loading } = useAuth()
  const [productResponse, setProductResponse] = useState()
  const [artisanResponse, setArtisanResponse] = useState()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: []
  })

  const handleImageChange = (event) => {
    const files = event.target.files
    const imagesArray = []
    for (let i = 0; i < files.length; i++) {
      imagesArray.push(files[i])
    }
    setFormData({
      ...formData,
      images: imagesArray
    })
  }

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  useEffect(() => {
    const getData = async () => {
      const _artisanResponse = await getArtisanInfos(user.id)
      setArtisanResponse(_artisanResponse)
    }
    getData()
  }, [])

  const handleAddProduct = async (event) => {
    event.preventDefault()
    try {
      await createProduct(formData, jwt, artisanResponse.data[0]?.id)
      toast.success('Le produit a bien été créé')
    } catch (error) {
      console.error('Error creating product:', error)
      toast.error('Une erreur est survenue dans la création du produit')
      throw new Error('Une erreur est survenue dans la création du produit')
    }
  }

  useEffect(() => {
    const getData = async () => {
      const _productResponse = await getArtisanProducts(user.id)
      setProductResponse(_productResponse)
    }
    getData()
  }, [])

  return (
    <div className='flex gap-10'>
      <form className='flex flex-col gap-4' onSubmit={handleAddProduct}>
        <h3 className='mt-5 mb-2 font-semibold text-xl flex'>Ajouter un produit</h3>
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
          value={formData.price}
          onChange={handleChange}
        />
        <Input
          name='images'
          type='file'
          accept='image/*'
          multiple
          value={formData.username}
          onChange={handleImageChange}
        />
        <Button
          type='submit'
          isLoading={loading}
        >
          Ajouter un produit
        </Button>
      </form>

      <div>
        <h3 className='my-5 font-semibold text-xl flex'>Vos produits</h3>
        {
          productResponse && <ProductDeleteUpdate products={productResponse.data} />
        }
      </div>
    </div>
  )
}

ArtisanDashboard.propTypes = {
  attributes: PropTypes.object
}

export default ArtisanDashboard
