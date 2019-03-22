import React, { Component } from 'react';
import classNames from 'classnames';
import './TodoItem.css';
import checkBoxEmpty from '../icons/check-box-empty.svg';
import checkBox from '../icons/check-box.svg';

class TodoItem extends Component {
  render() {
    const { item, onClick } = this.props;
    let url = checkBoxEmpty;
    if(item.isComplete) {
      url = checkBox;
    };
    return (
      <div className={classNames('todoItem', { 'todoItem-complete': item.isComplete })}>
        <img 
          src={url} 
          className={classNames('check-box-empty', { 'check-box': url === checkBox })} 
          onClick={onClick} 
          alt="" />
        <p>{item.title}</p>
      </div>
    )
  }
}

export default TodoItem;