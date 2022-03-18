const state = {
  cartItems: []
}
const mutations = {
  UPDATE_CART (state, payload) {
    state.cartItems = payload
  },
  ADD_PRODUCT_TO_CART (state, { product, quantity }) {
    const productInCart = state.cartItems.find(item => item.product.id === product.id)

    if (productInCart) {
      productInCart.quantity += quantity
      localStorage.setItem('cart', JSON.stringify(state.cartItems))
      return
    }

    state.cartItems.push({
      product,
      quantity
    })
    localStorage.setItem('cart', JSON.stringify(state.cartItems))
  },
  INCREMENT_PRODUCT_QUANTITY (state, product) {
    const current = state.cartItems.find(item => item.product.id === product.id)

    current.quantity += 1
    localStorage.setItem('cart', JSON.stringify(state.cartItems))
  },
  REMOVE_PRODUCT_FROM_CART (state, product) {
    const current = state.cartItems.find(item => item.product.id === product.id)

    current.quantity -= 1
    if (current.quantity === 0) {
      state.cartItems = state.cartItems.filter(item => item.product.id !== product.id)
    }
    localStorage.setItem('cart', JSON.stringify(state.cartItems))
  }
}

const getters = {
  getTotalItemsInCart (state) {
    let totalItems = 0

    state.cartItems.forEach(item => {
      totalItems += item.quantity
    })

    return totalItems
  },
  getTotalPriceInCart (state) {
    let totalPrice = 0

    state.cartItems.forEach(item => {
      totalPrice += item.product.price * item.quantity
    })

    return totalPrice
  },
  getTotalAmountWithDiscountApplied (state) {
    let totalPrice = 0

    state.cartItems.forEach(item => {
      totalPrice += (item.product.regularPrice - item.product.price) * item.quantity
    })
    return totalPrice
  }
}

export default {
  state,
  mutations,
  getters
}
