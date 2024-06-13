import React from 'react';

export interface ITasksContext {
  id: string;
  title: string;
}

export const TasksContext = React.createContext<ITasksContext>(
  {} as ITasksContext,
);

export const TasksProvider: React.FunctionComponent = ({children}) => {
  return (
    <TasksContext.Provider value={{id: '1', title: 'Task 1'}}>
      {children}
    </TasksContext.Provider>
  );
};
