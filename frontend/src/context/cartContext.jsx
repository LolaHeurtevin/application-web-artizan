import { createContext, useReducer, useEffect, useContext } from 'react'
import { toast } from 'react-toastify'

const CartContext = createContext()

const actionTypes = {
  ADD: 'ADD', // ajouter un article au panier
  DELETE: 'DELETE', // supprimer un article du panier
  SET: 'SET_CART',
  ERROR: 'ERROR'
}

const initialState = {
  cart: [],
  error: null
}

/**
 * @param prevState état précedant l'action
 * @param action action pour mettre à jour l'état = {type, data?}
 */
const cartReducer = (prevState, action) => {
  switch (action.type) {
    case actionTypes.ADD:
      return {
        ...prevState,
        cart: [...prevState.cart, action.product],
        error: null
      }
    case actionTypes.DELETE:
      return {
        ...prevState,
        // cart: prevState.cart.filter((item) => item.id !== action.productId)
        cart: prevState.cart.filter((item) => item.id !== action.product.id),
        error: null
      }
    case actionTypes.SET:
      return {
        ...prevState,
        cart: action.cart,
        error: null
      }
    case actionTypes.ERROR:
      return {
        cart: [],
        error: action.data.error
      }
    default:
      throw new Error(`Unhandled action type : ${action.type}`)
  }
}

const cartFactory = (dispatch) => ({
  addToCart: (product) => {
    try {
      dispatch({ type: actionTypes.ADD, product })
    } catch (error) {
      console.log(error)
      toast.error('Une erreur est survenue lors de l\'ajout au panier')
      dispatch({
        type: actionTypes.ERROR,
        data: { error: 'Une erreur est survenue lors de l\'ajout au panier' }
      })
    }
  },
  /*
  deleteFromCart: (productId) => {
    dispatch({ type: actionTypes.DELETE, productId })
  } */
  deleteFromCart: (product) => {
    try {
      dispatch({
        type: actionTypes.DELETE,
        product: {
          id: product.id
        }
      })
    } catch (error) {
      console.log(error)
      toast.error('Une erreur est survenue lors de la suppression du panier')
      dispatch({
        type: actionTypes.ERROR,
        data: { error: 'Une erreur est survenue lors de la suppresion du panier' }
      })
    }
  }

})

const CartProvider = ({ children }) => {
  const savedState = window.localStorage.getItem('cart')
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // récupère l'état du panier depuis le stockage local
  useEffect(() => {
    if (savedState) {
      try {
        dispatch({ type: 'SET_CART', cart: JSON.parse(savedState) })
      } catch (error) {
        console.error('Error parsing JSON:', error)
      }
    }
  }, [])

  // sauvegarde l'état du panier dans le stockage local à chaque modification
  useEffect(() => {
    window.localStorage.setItem('cart', JSON.stringify(state.cart))
  }, [state.cart])

  return (
    <CartContext.Provider value={{ state, ...cartFactory(dispatch) }}>
      {children}
    </CartContext.Provider>
  )
}

const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside an <CartProvider>')
  return context
}

export {
  CartProvider,
  useCart
}
