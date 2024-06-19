import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {renderHook, act} from '@testing-library/react-hooks';
import {Home} from '../../src/pages/Home';
import {TasksProvider, useTaskList} from '../../src/context/TasksContext';

describe('Home page', () => {
  it('renders correctly', () => {
    const {getByPlaceholderText} = render(<Home />);
    const newTaskInput = getByPlaceholderText('New task...');

    expect(newTaskInput).toBeDefined();
  });

  it('inserts a new task correctly using hook', async () => {
    const {result} = renderHook(() => useTaskList(), {
      wrapper: TasksProvider,
    });

    await act(async () => {
      await result.current.addTask({id: '1', title: 'task'});
    });

    const actual = result.current.tasks;
    const expected = [{id: '1', title: 'task'}];

    expect(actual).toEqual(expected);
  });

  it('inserts a new task correctly on button click', async () => {
    const {getByPlaceholderText, getByTestId} = render(<Home />, {
      wrapper: TasksProvider,
    });
    const {result} = renderHook(() => useTaskList(), {
      wrapper: TasksProvider,
    });

    const newTaskInput = getByPlaceholderText('New task...');
    const newTaskButton = getByTestId('addNewTaskButton');

    act(() => fireEvent.changeText(newTaskInput, 'task'));
    await act(async () => await fireEvent.press(newTaskButton));

    const actual = result.current.tasks;

    expect(actual).toBeTruthy();
    expect(actual.length).toEqual(1);
  });
});
