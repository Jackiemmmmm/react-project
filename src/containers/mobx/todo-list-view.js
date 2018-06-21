import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';

@observer
export default class TodoListView extends Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.todoList.todos.map(todo => <TodoView todo={todo} key={todo.id} />)}
        </ul>
        Tasks left: {this.props.todoList.unfinishedTodoCount}
      </div>
    );
  }
}

const TodoView = observer(({ todo }) => (
  <li>
    <input
      type="checkbox"
      checked={todo.finished}
      onClick={() => (todo.finished = !todo.finished)}
    />{todo.title}
  </li>
));
