// initialState.js
const initialState = {
    user: {
      isLoggedIn: !!localStorage.getItem('access_token'),
      // other user states...
    },
    // other global states...
  };
  
  export default initialState;
  