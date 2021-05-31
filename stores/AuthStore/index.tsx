import React, {createContext, useReducer} from 'react';
import { AuthStateInterface, AuthActionInterface, initialState } from './schema';

const AuthStore = createContext({ state: initialState, dispatch: (payload: any) => {} });
const { Provider } = AuthStore;

function AuthProvider({ children }: any) {
  const [state, dispatch] = useReducer((state: AuthStateInterface, action: AuthActionInterface) => {
    switch (action.type) {
      case 'login':

        const accessToken = action.payload.authInfo.accessToken;
        const refreshToken = action.payload.authInfo.refreshToken;
        const userInfo = action.payload.userInfo;

        const isLogin = true;
        
        localStorage.accessToken = accessToken;
        localStorage.refreshToken = refreshToken;

        return {
          authInfo: {
            ...state.authInfo,
            accessToken,
            refreshToken,
            isLogin,
          },
          userInfo: {
            ...state.userInfo,
            ...userInfo,
          }
        };

      case 'refresh':
        return {
          authInfo: {
            ...state.authInfo,
            accessToken: localStorage.accessToken,
            refreshToken: localStorage.refreshToken,
            isLogin: true,
          },
          userInfo: {
            ...state.userInfo,
            ...action.payload.userInfo,
          }
        };
      case 'logout':
        localStorage.accessToken = '';
        localStorage.refreshToken = '';

        return initialState;
      default:
        throw new Error();
    }
  }, initialState);

  return (
    <Provider value={{ state, dispatch }}>
      {children}
    </Provider>
  );
}

export { AuthStore, AuthProvider }
