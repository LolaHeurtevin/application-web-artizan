import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { toast } from 'react-toastify'
import { deleteProduct, updateProduct } from '../../services/api'
import { useAuth } from '../../context/authContext'

// ProductSelectTag
function ProductDeleteUpdate ({ products }) {
  const { state: { jwt }, loading } = useAuth()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: ''
  })

  const handleDeleteProduct = async () => {
    try {
      await deleteProduct(idProduct, jwt)
      toast.success('Le produit séléctionné a bien été supprimé')
    } catch (error) {
      console.error('Error deleting product:', error)
      toast.error('Une erreur est survenue dans la suppression du produit')
      throw new Error('Une erreur est survenue dans la suppression du produit')
    }
  }

  const handleUpdateProduct = async (event) => {
    event.preventDefault()
    try {
      if (formData.name === '' || formData.description === '' || formData.price === '') {
        toast.error('Vous devez compléter tous les champs pour modifier le produit')
      }
      await updateProduct(idProduct, jwt, formData)
      toast.success('Le produit séléctionné a bien été mis à jour')
    } catch (error) {
      console.error('Error updating product:', error)
      toast.error('Une erreur est survenue dans la mise à jour du produit')
      throw new Error('Une erreur est survenue dans la mise à jour du produit')
    }
  }

  const [idProduct, setIdProduct] = useState()

  const handleChange = (event) => {
    setIdProduct(event.target.value)
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  /*
      <select value={idProduct} onChange={handleChange}>
        <option value=''>Sélectionnez un produit</option>
        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.attributes.name}
          </option>
        ))}
      </select>
      */

  return (
    <form className='flex flex-col gap-4' onSubmit={handleUpdateProduct}>
      <Select
        label='Sélectionnez un produit'
        className='max-w-xs'
        value={idProduct}
        onChange={handleChange}
      >
        {products.map((product) => (
          <SelectItem key={product.id} value={product.id}>
            {product.attributes.name}
          </SelectItem>
        ))}
      </Select>
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
      <Button
        type='submit'
        isLoading={loading}
      >
        Mettre à jour
      </Button>
      <Button
        onClick={handleDeleteProduct}
        isLoading={loading}
      >
        Supprimer
      </Button>
    </form>
  )
}

ProductDeleteUpdate.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object)
}

export default ProductDeleteUpdate
