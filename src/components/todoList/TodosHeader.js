import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { AddTodoDialog } from './AddTodoDialog';

function TodoHeader({todoList, setTodoList}) {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Todo List
        </Typography>
        <AddTodoDialog  todoList={todoList} setTodoList={setTodoList}/>
      </Toolbar>
    </AppBar>
  );
}

export  {TodoHeader};