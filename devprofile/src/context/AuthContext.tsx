import React from 'react';

interface IAuthContext {
  name: string;
  signIn(): void;
}

export const AuthContext = React.createContext({} as IAuthContext);

export const AuthProvider: React.FunctionComponent = ({ children }) => {
  const signIn = () => {
    console.log('signIn');
  };

  return (
    <AuthContext.Provider value={{ name: 'Oscar Neto', signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
