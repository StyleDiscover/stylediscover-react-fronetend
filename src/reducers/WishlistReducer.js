export const wishlistReducer = (state, action) => {
   switch (action.type) {
      case 'SET_WISHLISTS':
         return {
            ...state,
            wishlists: action.data,
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
            loading: false,
            wishlists: [],
            errorData: {},
         };
      default:
         return state;
   }
};
