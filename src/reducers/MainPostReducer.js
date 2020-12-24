export const mainPostReducer = (state, action) => {
   switch (action.type) {
      case 'SET_MAIN_POSTS':
         return {
            ...state,
            mainPosts: action.data,
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

      case 'ADD_MAIN_POST':
         return {
            ...state,
            mainPosts: [...state.mainPosts, action.data],
         };

      case 'REMOVE_MAIN_POST':
         return {
            ...state,
            mainPosts: state.mainPosts.filter(
               (mainpost) => mainpost.id !== action.id
            ),
         };

      case 'EDIT_MAIN_POST':
         var tempState = state.mainPosts.filter(
            (mainpost) => mainpost.id !== action.id
         );
         return {
            ...state,
            mainPosts: [...tempState, action.data],
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
            mainPosts: [],
            errorData: {},
         };
      default:
         return state;
   }
};
