import * as React from 'react';
export const AppContext = React.createContext();

const initialState = {
  user: null,
  loading: true,
};

const AppReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.user || state.user,
        loading: action.loading,
      };
  }
};

const AppContextProvider = (props) => {
  const [appInfo, dispatchApp] = React.useReducer(AppReducer, initialState);
  return (
    <AppContext.Provider value={{appInfo, dispatchApp}}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
