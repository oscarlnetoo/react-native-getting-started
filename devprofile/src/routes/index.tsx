import React from 'react';
import { OpenRoutes } from './open.routes';
import { useAuth } from '../context/AuthContext';
import { PrivateRoutes } from './private.routes';

export const Routes: React.FunctionComponent = () => {
  const { user } = useAuth();

  return user?.id ? <PrivateRoutes /> : <OpenRoutes />;
};
