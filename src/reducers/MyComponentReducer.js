export const myComponentReducer = (state, action) => {
   switch (action.type) {
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

      case 'ADD_COMPONENT':
         var tempComponents = [...state.addComponents];
         return {
            ...state,
            addComponents: [...action.id, ...tempComponents],
         };
      case 'SET_COMPONENT':
         return {
            ...state,
            myCollection: [...action.data],
         };

      case 'REMOVE_COMPONENT':
         return {
            ...state,
            addComponents: state.addComponents.filter(
               (component) => component !== action.id
            ),
         };

      case 'UNSET_STATE':
         return {
            ...state,
            addComponents: [],
         };
      default:
         return state;
   }
};
