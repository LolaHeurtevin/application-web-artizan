import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

/**
 * Call API login route
 * @param { object } credentials {identifier, password}
 * @return { object } { jwt, user }
 */
const loginApi = async (credentials) => {
  const response = await axiosInstance.post('/auth/local', credentials)
  return response?.data
}

/**
 * Call API register route
 * @param { object } userData
 */
const registerApi = async (userData) => {
  const response = await axiosInstance.post('/auth/local/register', {
    firstName: userData.firstName,
    lastName: userData.lastName,
    username: userData.username,
    email: userData.email,
    password: userData.password,
    role: 'Authenticated'
  })
  return response?.data
}

/**
 * Call API register route with Artisan role
 * @param { object } userData
 */
const registerArtisanUser = async (userData) => {
  const response = await axiosInstance.post('/auth/local/register', {
    firstName: userData.firstName,
    lastName: userData.lastName,
    username: userData.username,
    email: userData.email,
    password: userData.password,
    role: 'Artisan'
  })
  return response?.data
}

/**
 * Call API route to create Artisan
 * @param { object } userData
 */
const registerArtisan = async (userData) => {
  const response = await axiosInstance.post('/artisans',
    {
      data: {
        name: userData.username,
        user: userData.id
      }
    })
  return response?.data
}

/// CRUD PRODUCTS ///

/**
 * Call API route to create a product
 * @param { object } product
 */
const createProduct = async (product, jwt, id) => {
  const response = await axiosInstance.post('/products',
    {
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        images: product.images,
        artisan: id
      }
    },
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
  return response?.data
}

/**
 * Call API route to update a product
 * @param { object } product
 */
const updateProduct = async (id, jwt, formData) => {
  const response = await axiosInstance.put(`/products/${id}`,
    {
      data: {
        name: formData.name,
        description: formData.description,
        price: formData.price
      }
    },
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
  return response?.data
}

/**
 * Call API route to update a product
 * @param { object } product
 */
const deleteProduct = async (id, jwt) => {
  const response = await axiosInstance.delete(`/products/${id}`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
  return response?.data
}

/**
 * Call API route to get all infos from an artisan
 */
const getArtisanProducts = async (id) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/products?&filter[artisan][user]=${id}`)
  return response?.data
}

const getArtisanInfos = async (userId) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/artisans?&filters[user][id]=${userId}`)
  return response?.data
}

export {
  loginApi,
  registerApi,
  registerArtisan,
  registerArtisanUser,
  createProduct,
  getArtisanProducts,
  getArtisanInfos,
  updateProduct,
  deleteProduct
}
