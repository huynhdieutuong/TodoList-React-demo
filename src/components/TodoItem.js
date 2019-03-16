import React, { Component } from 'react';
import classNames from 'classnames';
import './TodoItem.css';

class TodoItem extends Component {
  render() {
    const { item } = this.props;
    let className = classNames({
      todoItem: true,
      'todoItem-complete': item.isComplete
    });
    return (
      <div className={className}>
        <p>{item.title}</p>
      </div>
    )
  }
}

export default TodoItem;