import { createContext, useReducer, useEffect, useContext } from 'react'
import { toast } from 'react-toastify'

const BackofficeContext = createContext()

const actionTypes = {
  ADD: 'ADD', // créer un article
  DELETE: 'DELETE', // supprimer un article
  UPDATE: 'UPDATE', // mettre à jour un article
  SET: 'SET_BACKOFFICE',
  ERROR: 'ERROR'
}

const initialState = {
  artisanProducts: [],
  error: null
}

/**
 * @param prevState état précedant l'action
 * @param action action pour mettre à jour l'état = {type, data?}
 */
const backofficeReducer = (prevState, action) => {
  switch (action.type) {
    case actionTypes.ADD:
      return {
        ...prevState,
        artisanProducts: [...prevState.artisanProducts, action.product],
        error: null
      }
    case actionTypes.DELETE:
      return {
        ...prevState,
        artisanProducts: prevState.artisanProducts.filter((item) => item.id !== action.product.id),
        error: null
      }
    case actionTypes.UPDATE:
      return {
        // à écrire
      }
    case actionTypes.SET:
      return {
        ...prevState,
        artisanProducts: action.artisanProducts,
        error: null
      }
    case actionTypes.ERROR:
      return {
        artisanProducts: [],
        error: action.data.error
      }
    default:
      throw new Error(`Unhandled action type : ${action.type}`)
  }
}

const backofficeFactory = (dispatch) => ({
  addProduct: (product) => {
    try {
      dispatch({ type: actionTypes.ADD, product })
    } catch (error) {
      console.log(error)
      toast.error('Une erreur est survenue lors de la création du produit')
      dispatch({
        type: actionTypes.ERROR,
        data: { error: 'Une erreur est survenue lors de la création du produit' }
      })
    }
  },
  deleteProduct: (product) => {
    try {
      dispatch({
        type: actionTypes.DELETE,
        product: {
          id: product.id
        }
      })
    } catch (error) {
      console.log(error)
      toast.error('Une erreur est survenue lors de la suppression du produit')
      dispatch({
        type: actionTypes.ERROR,
        data: { error: 'Une erreur est survenue lors de la suppresion du produit' }
      })
    }
  },
  updateProduct: (product) => {
    try {
      dispatch({ type: actionTypes.UPDATE, product })
    } catch (error) {
      console.log(error)
      toast.error('Une erreur est survenue lors de la mise à jour du produit')
      dispatch({
        type: actionTypes.ERROR,
        data: { error: 'Une erreur est survenue lors de la mise à jour du produit' }
      })
    }
  }

})

const BackofficeProvider = ({ children }) => {
  const savedState = window.localStorage.getItem('backoffice')
  // const _initialState = savedState ? JSON.parse(savedState) : initialState

  // const [state, dispatch] = useReducer(backofficeReducer, _initialState)
  const [state, dispatch] = useReducer(backofficeReducer, initialState)

  useEffect(() => {
    if (savedState) {
      try {
        dispatch({ type: 'SET_BACKOFFICE', backoffice: JSON.parse(savedState) })
      } catch (error) {
        console.error('Error parsing JSON:', error)
      }
    }
  }, [])

  // sauvegarde l'état du backoffice dans le stockage local à chaque modification
  useEffect(() => {
    window.localStorage.setItem('backoffice', JSON.stringify(state.artisanProducts))
  }, [state.artisanProducts])

  return (
    <BackofficeContext.Provider value={{ state, ...backofficeFactory(dispatch) }}>
      {children}
    </BackofficeContext.Provider>
  )
}

const useBackoffice = () => {
  const context = useContext(BackofficeContext)
  if (!context) throw new Error('useBackoffice must be used inside an <BackofficeProvider>')
  return context
}

export {
  BackofficeProvider,
  useBackoffice
}
