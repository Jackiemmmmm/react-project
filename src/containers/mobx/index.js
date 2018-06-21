import React, { PureComponent } from 'react';
import { observable, computed } from 'react-mobx';
import TodoListView from './todo-list-view';

class TodoList {
  @observable todos = [];
  @computed get unfinishedTodoCount() {
    return this.todos.filter(todo => !todo.finished).length;
  }
}


const store = new TodoList();

export default class MobxDemo extends PureComponent {
  render() {
    return (
      <div>
        <TodoListView todoList={store} />
      </div>
    );
  }
}
