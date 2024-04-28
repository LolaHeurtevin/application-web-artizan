import { createContext, useContext, useEffect, useReducer } from 'react'
import { loginApi, registerApi, registerArtisan, registerArtisanUser } from '../services/api'
import { toast } from 'react-toastify'

const AuthContext = createContext()

const actionTypes = {
  LOGIN: 'LOGIN', // connecté avec succes
  REGISTER: 'REGISTER', // inscrit + connecté avec succes
  LOGOUT: 'LOGOUT', // déconnecté
  LOADING: 'LOADING', // chargement
  ERROR: 'ERROR', // erreur
  RESET: 'RESET' // réinitialisation de l'état
}

const initialState = {
  jwt: null,
  user: null,
  loading: false,
  isLoggedIn: false,
  error: null
}

/**
 * @param prevState état précedant l'action
 * @param action action pour mettre à jour l'état = {type, data?} (data? = data est optionel)
 */
const authReducer = (prevState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        jwt: action.data.jwt,
        user: action.data.user,
        isLoggedIn: true,
        loading: false,
        error: null
      }
    case actionTypes.ERROR:
      return {
        jwt: null,
        user: null,
        loading: false,
        isLoggedIn: false,
        error: action.data.error
      }
    case actionTypes.LOADING:
      return {
        ...prevState, // recopie de l'état précédent
        loading: true
      }
    case actionTypes.RESET:
    case actionTypes.LOGOUT:
      return initialState
    case actionTypes.REGISTER:
      return {
        ...prevState,
        isLoggedIn: true,
        loading: false,
        error: null
      }
    default:
      throw new Error(`Unhandled action type : ${action.type}`)
  }
}

const authFactory = (dispatch) => ({
  // credentials = { identifier, password }
  login: async (credentials) => {
    dispatch({ type: actionTypes.LOADING })
    try {
      const result = await loginApi(credentials)
      dispatch({
        type: actionTypes.LOGIN,
        data: {
          user: result.user,
          jwt: result.jwt
        }
      })
    } catch (error) {
      console.log(error)
      toast.error('Identifiant ou mot de passe incorrect')
      dispatch({
        type: actionTypes.ERROR,
        data: { error: 'Identifiant ou mot de passe incorrect' }
      })
    }
  },
  logout: () => {
    dispatch({ type: actionTypes.LOGOUT })
  },
  register: async (data) => {
    dispatch({ type: actionTypes.LOADING })
    try {
      if (data.isArtisan === true) {
        try {
          const result = await registerArtisanUser(data)
          dispatch({
            type: actionTypes.REGISTER,
            data: {
              lastName: result.lastName,
              firstName: result.firstName,
              username: result.username,
              email: result.email,
              password: result.password,
              role: result.role
            }
          })
          await registerArtisan({ name: result.user.username, id: result.user.id })
        } catch (error) {
          console.log(error)
          toast.error('Une erreur est survenue lors de la création de votre profil artisan')
          dispatch({
            type: actionTypes.ERROR,
            data: { error: 'Une erreur est survenue lors de la création de votre profil artisan' }
          })
        }
      } else {
        const result = await registerApi(data)
        console.log(result)
        dispatch({
          type: actionTypes.REGISTER,
          data: {
            lastName: result.lastName,
            firstName: result.firstName,
            username: result.username,
            email: result.email,
            password: result.password,
            role: 'Authenticated'
          }
        })
      }
      try {
        await authFactory(dispatch).login({ identifier: data.email, password: data.password })
      } catch (error) {
        console.log(error)
        toast.error('Une erreur est survenue lors de la connexion')
        dispatch({
          type: actionTypes.ERROR,
          data: { error: 'Une erreur est survenue lors de la connexion' }
        })
      }
    } catch (error) {
      console.log(error)
      toast.error('Une erreur est survenue lors de la création de votre compte')
      dispatch({
        type: actionTypes.ERROR,
        data: { error: 'Une erreur est survenue lors de la création de votre compte' }
      })
    } /*
    try {
      if (data.isArtisan === true) {
        await registerArtisan()
      }
    } catch (error) {
      toast.error('Une erreur est survenue lors de la création du profil artisan')
      dispatch({
        type: actionTypes.ERROR,
        data: { error: 'Une erreur est survenue lors de la création du profil artisan' }
      })
    } */
  }
})

const AuthProvider = ({ children }) => {
  const savedState = window.localStorage.getItem('AUTH')
  const _initialState = savedState ? JSON.parse(savedState) : initialState

  const [state, dispatch] = useReducer(authReducer, _initialState)

  useEffect(() => {
    window.localStorage.setItem('AUTH', JSON.stringify(state))
  }, [state])

  return (
    <AuthContext.Provider value={{ state, ...authFactory(dispatch) }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside an <AuthProvider>')
  return context
}

export {
  AuthProvider,
  useAuth
}
