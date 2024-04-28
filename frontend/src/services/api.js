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

export {
  loginApi,
  registerApi,
  registerArtisan,
  registerArtisanUser
}
