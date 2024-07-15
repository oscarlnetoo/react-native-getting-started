import React from 'react';
import { IUser } from '../model/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';
import { Alert } from 'react-native';

interface IAuthState {
  token: string;
  user: IUser;
}

interface ICredentials {
  email: string;
  password: string;
}

interface IAuthContext {
  user: IUser;
  signIn(credentials: ICredentials): void;
  signOut(): void;
}

const tokenData = '@DevProfile:token';
const userData = '@DevProfile:user';

export const AuthContext = React.createContext({} as IAuthContext);

export const AuthProvider: React.FunctionComponent = ({ children }) => {
  const [data, setData] = React.useState<IAuthState>({} as IAuthState);

  const signIn = async ({ email, password }: ICredentials) => {
    try {
      const response = await api.post('sessions', {
        email,
        password,
      });

      console.log(response.data);

      const { token, user } = response.data;

      await AsyncStorage.setItem(tokenData, token);
      await AsyncStorage.setItem(userData, JSON.stringify(user));
      setData({ token, user });
    } catch (error) {
      Alert.alert(
        'Authentication error',
        'An error happened while trying to login, verify your credentials.',
      );
    }
  };

  const signOut = async () => {
    await AsyncStorage.removeItem(tokenData);
    await AsyncStorage.removeItem(userData);
    setData({} as IAuthState);
  };

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): IAuthContext => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used with AuthProvider.');
  }

  return context;
};
