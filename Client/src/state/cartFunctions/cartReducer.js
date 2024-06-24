// state/cartReducer.js
const initialState = {
  items: [],
  totalPrice: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REMOVE_FROM_CART':
      const updatedItems = state.items.filter(item => item.productId !== action.payload);
      const updatedTotalPrice = updatedItems.reduce((sum, item) => sum + item.price, 0);
      return {
        ...state,
        items: updatedItems,
        totalPrice: updatedTotalPrice,
      };
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        totalPrice: 0,
      };
    default:
      return state;
  }
};

export default cartReducer;
