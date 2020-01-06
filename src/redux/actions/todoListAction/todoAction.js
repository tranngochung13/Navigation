export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const UPDATE_TASK = ' UPDATE_TASK';

import _ from 'lodash';
import store from '../../store';

export const addTask = newItem => {
  const tasks = store.getState().task.tasks;
  console.log('task', tasks);

  return {
    type: ADD_TASK,
    payload: [...tasks, newItem],
  };
};

export const onDeleteTask = id => {
  const tasks = store.getState().task.tasks;
  const newArr = _.filter(tasks, item => item.id !== id);
  return {
    type: DELETE_TASK,
    payload: newArr,
  };
};

export const actUpdateItem = updateArr => {
  return {
    type: UPDATE_TASK,
    payload: updateArr,
  };
};
