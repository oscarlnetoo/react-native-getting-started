import React from 'react';
import {Home} from './src/pages/Home';
import {TasksProvider} from './src/context/TasksContext';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <TasksProvider>
      <Home />
    </TasksProvider>
  );
};

export default App;
