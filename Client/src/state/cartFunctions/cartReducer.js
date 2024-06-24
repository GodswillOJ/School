// state/cartReducer.js
const initialState = {
    items: [],
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'REMOVE_FROM_CART':
        return {
          ...state,
          items: state.items.filter(item => item.productId !== action.payload),
        };
      case 'CLEAR_CART':
        return {
          ...state,
          items: [],
        };
      default:
        return state;
    }
  };
  
  export default cartReducer;
  