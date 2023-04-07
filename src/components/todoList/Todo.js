import React, { useState } from 'react';
import { TodoHeader } from './TodosHeader';
import { TodoListTable } from './TodoListTable';

const Todo = () => {
    const [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem('todoList')  )||[{
        title: 'Title',
        description: 'Description',
        checked: false,
        created_at: new Date().getTime(),
        finished_at: undefined,
        archive_at: undefined,
        id:0
    }]);
    return (
        <div>
            <TodoHeader todoList={todoList} setTodoList={setTodoList}/>
            <TodoListTable todoList={todoList} setTodoList={setTodoList} />
        </div>
    );
}

export default Todo;
