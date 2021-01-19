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
         var tempState = [...state.mainPosts];
         return {
            ...state,
            mainPosts: [action.data, ...tempState],
         };

      case 'REMOVE_MAIN_POST':
         return {
            ...state,
            mainPosts: state.mainPosts.filter(
               (mainpost) => mainpost !== action.id
            ),
         };

      case 'RELOAD_MAIN_POST':
         var index = state.mainPosts.indexOf(action.data);
         if (index !== -1) {
            state.mainPosts[index] = action.data;
         }
         return {
            ...state,
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
         return state;

      case 'UNSET_STATE_LOGOUT':
         return {
            loading: false,
            mainPosts: [],
            errorData: {},
         };

      default:
         return state;
   }
};
