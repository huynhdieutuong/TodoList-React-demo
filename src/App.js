import React, { Component } from 'react';
import classNames from 'classnames';
import TodoItem from './components/TodoItem';
import './App.css';
import downArrow from './icons/down-arrow.svg';

class App extends Component {
  constructor() {
    super();
    this.state = {
      newItem: '',
      currentFilter: 'all',
      todoItems: [
        { title: 'Học React', isComplete: false },
        { title: 'Làm pet projects', isComplete: false },
        { title: 'Xin việc', isComplete: false }
      ]
    };
    //this.onItemClicked = this.onItemClicked.bind(this);
    this.addItem = this.addItem.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onAllFinished = this.onAllFinished.bind(this);
    this.allItems = this.allItems.bind(this);
    this.activeItems = this.activeItems.bind(this);
    this.completedItems = this.completedItems.bind(this);
  }

  onItemClicked(item) {
    const { todoItems } = this.state;
    const index = todoItems.indexOf(item);
    return () => {
      this.setState({
        todoItems: [
          ...todoItems.slice(0, index),
          { ...item, isComplete: !item.isComplete },
          ...todoItems.slice(index + 1)
        ]
      });
    }
  }

  addItem(event) {
    const { todoItems } = this.state;
    let text = event.target.value;
    text = text.trim();
    if(!text || text === '') {
      return;
    }
    if(event.keyCode === 13) {
      this.setState({
        newItem: '',
        todoItems: [
          ...todoItems,
          { title: text, isComplete: false }
        ]
      });
    }
  };

  onChange(event) {
    const text = event.target.value;
    this.setState({
      newItem: text
    });
  }

  onAllFinished() {
    const { todoItems } = this.state;
    const allFinished = todoItems.map(function(item) {
      return { title: item.title, isComplete: !item.isComplete };
    });
    this.setState({
      todoItems: [...allFinished]
    })
  }

  allItems() {
    const { todoItems } = this.state;
    this.setState({
      currentFilter: 'all',
      todoItems: todoItems
    });
  }

  activeItems() {
    const { todoItems } = this.state;
    const filterFalse = todoItems.filter(item => item.isComplete === false);
    this.setState({
      currentFilter: 'active',
      todoItems: filterFalse
    });
  }

  completedItems() {
    const { todoItems } = this.state;
    const filterTrue = todoItems.filter(item => item.isComplete === true);
    this.setState({
      currentFilter: 'completed',
      todoItems: filterTrue
    });
  }

  render() {
    const { todoItems, newItem, currentFilter } = this.state;
    const filterFalse = todoItems.filter(item => item.isComplete === false);
    return (
      <div className="App">
        <h1>todos</h1>
        <div className="addItem">
          <img
            className={classNames('down-arrow', {'down-arrow-1': filterFalse.length === 0 })} 
            src={downArrow}
            onClick={this.onAllFinished}
            alt="" />
          <input 
            type="text"
            placeholder='What needs to be done?' 
            onKeyUp={this.addItem} 
            value={newItem}
            onChange={this.onChange}/>
        </div>
        {
          todoItems.length > 0 && todoItems.map(
            (item, index) => 
            <TodoItem 
              key={index} 
              item={item}
              onClick={this.onItemClicked(item)}/>
          )
        }
        {
          todoItems.length === 0 && 'Nothing here.'
        }
        <div className="footer">
          <span className="count-items-left">{filterFalse.length} items left</span>
          <ul className="filters">
            <li 
              className= { classNames( { 'selected': currentFilter === 'all' } ) }
              onClick={this.allItems}>All</li>
            <li 
              className= { classNames( { 'selected': currentFilter === 'active' } ) }
              onClick={this.activeItems}>Active</li>
            <li 
              className= { classNames( { 'selected': currentFilter === 'completed' } ) }
              onClick={this.completedItems}>Completed</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
