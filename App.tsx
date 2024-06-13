import React from 'react';
import {Home} from './src/pages/Home';
import {TasksContext} from './src/context/TasksContext';

const App = () => {
  return (
    <TasksContext.Provider value={{id: '1', title: 'Task 1'}}>
      <Home />
    </TasksContext.Provider>
  );
};

export default App;
