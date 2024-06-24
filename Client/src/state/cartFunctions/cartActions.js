// state/cartActions.js
export const removeFromCart = (productId) => ({
    type: 'REMOVE_FROM_CART',
    payload: productId,
  });
  
  export const clearCart = () => ({
    type: 'CLEAR_CART',
  });
  