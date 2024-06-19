import React from 'react';
import {render} from '@testing-library/react-native';
import {renderHook, act} from '@testing-library/react-hooks';
import {TasksProvider, useTaskList} from '../../src/context/TasksContext';
import {TaskList} from '../../src/components/TaskList';

describe('TaskList component', () => {
  it('removes a task correctly from list', async () => {
    render(<TaskList />, {
      wrapper: TasksProvider,
    });
    const {result} = renderHook(() => useTaskList(), {
      wrapper: TasksProvider,
    });

    await act(
      async () => await result.current.addTask({id: '1', title: 'task'}),
    );

    expect(result.current.tasks[0].title).toEqual('task');

    await act(async () => await result.current.removeTask('1'));

    expect(result.current.tasks.length).toEqual(0);
  });
});
