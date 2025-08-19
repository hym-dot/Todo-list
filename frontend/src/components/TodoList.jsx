import React from 'react'
import './TodoList.css'
import TodoItem from './TodoItem'

const TodoList = ({ todos, updatedChecked, updatedText, onDelete }) => {
    return (
        <div className="TodoList">
            <div className="todos_wrapper">
                {todos.map((todo) => (
                    <TodoItem
                        key={todo._id}
                        todo={todo}
                        updatedChecked={updatedChecked}
                        updatedText={updatedText}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </div>
    );
};

export default TodoList