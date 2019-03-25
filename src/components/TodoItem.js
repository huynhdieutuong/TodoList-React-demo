import React, { Component } from 'react';
import classNames from 'classnames';
import './TodoItem.css';
import checkBoxEmpty from '../icons/check-box-empty.svg';
import checkBox from '../icons/check-box.svg';
import deleteItem from '../icons/delete.svg';

class TodoItem extends Component {
  onChange() {
  }
  render() {
    const { item, onClick, deleteItemClick, editItemClick, editing } = this.props;
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
        { !editing && <p onDoubleClick={editItemClick}>{item.title}</p> }
        { editing && <input onDoubleClick={editItemClick} value={item.title} onChange={() => this.onChange()}/>}
        
        <img 
          className="delete-item" 
          src={deleteItem} 
          onClick={deleteItemClick}
          alt="" />
      </div>
    )
  }
}

export default TodoItem;