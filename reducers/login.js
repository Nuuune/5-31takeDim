/**
 * Initial State
 */
const initialState = {
  isLogin: false,
  callback: null
};

/**
 * Home Reducer
 */
export default function reducer(state = initialState, action = {}) {
  
  
  switch (action.type) {
    //
    case 'DO_LOGIN':
      return {
        ...state,
        isLogin: true
      };
      break;
    //
    case 'GO_TO_LOGIN':
      wx.redirectTo({
        url: '/pages/account/login/index',
      })

      console.log(state)
      return {
        ...state,
        callback: action.callback
      };
      break;
    //
    case 'LOGIN_SUCCESS':
      state.callback();

      return {
        ...state,
        isLogin: true
      };
      break;

    default:
      return state;
      break;
  }

  return state;
}
