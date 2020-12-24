export const userReducer = (state, action) => {
   switch (action.type) {
      case 'AUTHENTICATE':
         return {
            ...state,
            isAuthenticated: true,
         };

      case 'UNAUTHENTICATE':
         return {
            ...state,
            isAuthenticated: false,
         };

      case 'LOADING':
         return {
            ...state,
            loading: true,
         };

      case 'NOT_LOADING':
         return {
            ...state,
            loading: false,
         };

      case 'SET_LOGIN_METHOD':
         return {
            ...state,
            loginMethod: action.data,
         };

      case 'SET_USER_DATA':
         return {
            ...state,
            userData: action.data,
         };

      case 'SET_ERROR_DATA':
         return {
            ...state,
            errorData: action.data,
         };

      case 'UNSET_ERROR_DATA':
         return {
            ...state,
            errorData: {},
         };

      case 'UNSET_STATE':
         return {
            isAuthenticated: false,
            loading: false,
            loginMethod: '',
            userData: {},
            errorData: {},
         };

      default:
         return state;
   }
};
