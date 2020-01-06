import { ADD_TASK, DELETE_TASK, UPDATE_TASK } from './todoAction';
import _ from 'lodash';

const initialState = {
  tasks: [
    {
      id: 0,
      title: 'Vẻ đẹp Đà Nẵng trong bộ ảnh "Dấu ấn Việt Nam"',
      date: '12-12-2019',
    },
    {
      id: 1,
      title: 'Cầu tình yêu Đà Nẵng',
      date: '12-12-2019',
    },
  ],
};

const app = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return { ...state, tasks: action.payload };

    case DELETE_TASK:
      return { ...state, tasks: action.payload };

    case UPDATE_TASK:
      return { ...state, tasks: action.payload };

    default:
      return state;
  }
};

export default app;

