import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

export interface ITask {
  id: string;
  title: string;
}

export interface ITasksContext {
  tasks: ITask[];
  addTask(task: ITask): void;
}

const tasksData = '@MyTasks:Tasks';

export const TasksContext = React.createContext<ITasksContext>(
  {} as ITasksContext,
);

export const TasksProvider: React.FunctionComponent = ({children}) => {
  const [data, setData] = React.useState<ITask[]>([]);

  React.useEffect(() => {
    async function loadTasks() {
      const taskList = await AsyncStorage.getItem(tasksData);

      if (taskList) {
        setData(JSON.parse(taskList));
      }
    }

    loadTasks();
  }, []);

  const addTask = async (task: ITask) => {
    const newTaskList = [...data, task];
    setData(newTaskList);
    await AsyncStorage.setItem(tasksData, JSON.stringify(newTaskList));
  };

  return (
    <TasksContext.Provider value={{tasks: data, addTask}}>
      {children}
    </TasksContext.Provider>
  );
};
