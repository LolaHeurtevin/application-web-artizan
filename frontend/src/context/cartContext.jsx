import { createContext, useReducer, useEffect, useContext } from 'react'

const CartContext = createContext()
export default CartContext

const actionTypes = {
  ADD: 'ADD', // ajouter un article au panier
  DELETE: 'DELETE', // supprimer un article du panier
  SET: 'SET_CART'
}

const initialState = {
  cart: []
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
        cart: [...prevState.cart, action.product]
      }
    case actionTypes.DELETE:
      return {
        ...prevState,
        cart: prevState.cart.filter((item) => item.id !== action.productId)
      }
    case actionTypes.SET:
      return {
        ...prevState,
        cart: action.cart
      }
    default:
      throw new Error(`Unhandled action type : ${action.type}`)
  }
}

const cartFactory = (dispatch) => ({
  addToCart: (product) => {
    dispatch({ type: actionTypes.ADD, product })
  },
  deleteFromCart: (productId) => {
    dispatch({ type: actionTypes.DELETE, productId })
  }
})

function CartProvider ({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // récupère l'état du panier depuis le stockage local
  useEffect(() => {
    const savedCart = window.localStorage.getItem('cart')
    if (savedCart) {
      try {
        dispatch({ type: 'SET_CART', cart: JSON.parse(savedCart) })
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
    <CartContext.Provider value={{ state, ...cartFactory }}>
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
