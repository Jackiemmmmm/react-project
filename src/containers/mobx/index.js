import React from 'react';

import TodoList from './components/TodoList';
import TodoListModel from './models/TodoListModel';

const store = new TodoListModel();

store.addTodo('Get Coffee');
store.addTodo('Write simpler code');
store.todos[0].finished = true;

setTimeout(() => {
  store.addTodo('Get a cookie as well');
}, 2000);

// playing around in the console


export default class MobxDemo extends React.PureComponent {
  render() {
    return (
      <div>
        test
        <TodoList store={store} />
      </div>
    );
  }
}
