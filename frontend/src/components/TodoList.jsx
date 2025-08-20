import React, { useState, useMemo } from 'react'
import './TodoList.css'
import TodoItem from './TodoItem'
const TodoList = ({ todos, onDelete, onUpdateChecked, onUpdateText }) => {
    const [q, setQ] = useState('')
    const filterd = useMemo(() => {

        const kw = q.trim().toLowerCase()

        if (!kw) return todos;
        return todos.filter((t) => (t.text ?? "").toLowerCase().includes(kw))

    }, [todos, q])

    return (
        <div className='TodoList'>
            <h4>Todo List 📝 </h4>
            <input type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder='검색어를 입력하세요' />
            <div className="todos-wrapper">
                {todos.map((todo, i) => (

                    <TodoItem
                        key={i}
                        todo={todo}
                        onUpdateChecked={onUpdateChecked}
                        onUpdateText={onUpdateText}
                        onDelete={onDelete} />
                ))}

            </div>
        </div>
    )
}

export default TodoList