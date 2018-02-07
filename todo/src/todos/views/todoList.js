import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TodoItem from './todoItem.js';
import {toggleTodo, removeTodo} from '../actions.js';
import {FilterTypes} from '../../constants.js';

const TodoList = ({todos,onToggleTodo,onRemoveTodo}) => {
    return (
        <ul>
        {
          todos.map((item) => (
            <TodoItem
              key={item.id}
              text={item.text}
              completed={item.completed}
              onToggle={() => onToggleTodo(item.id)}
              onRemove={() => onRemoveTodo(item.id)}
            />
            ))
        }
        </ul>
      );
}

const selectVisibleTodos = (todos, filter) => {
    switch(filter){
        case FilterTypes.ALL: 
            return todos;
        case FilterTypes.COMPLETED:
            return todos.filter((todo) => {return todo.completed});
        case FilterTypes.UNCOMPLETED:
            return todos.filter((todo) => {return !todo.completed});
        default:
            throw new Error('unsupported filter');
    }
}

const mapStateToProps = (state) => {
    return {
      todos: selectVisibleTodos(state.todos, state.filter)
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onToggleTodo: (id) => {
            dispatch(toggleTodo(id));
        },
        onRemoveTodo: (id) => {
            dispatch(removeTodo(id));
        }
    }
}

TodoList.propTypes = {
    todos: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);