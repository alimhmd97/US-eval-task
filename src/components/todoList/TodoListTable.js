
import { formatDate } from '../../helpers/helpers';
import { DeleteTodoDialog } from './DeleteTodoDialog';
import { EditTodoDialog } from './EditTodoDialog';
import styles from './todo.module.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function TodoListTable({ todoList, setTodoList }) {
  const handleCheckTodoChange = (todoItem) => {
   const updatedTodoItem={...todoItem,checked:!todoItem.checked}
    todoList?.splice(todoList.map(elem=>elem.id).indexOf(todoItem.id), 1,updatedTodoItem)
    setTodoList([...todoList])
    localStorage.setItem('todoList',JSON.stringify(todoList))
  }
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Finished At</TableCell>
            <TableCell>Archive At</TableCell>
            <TableCell>Checked</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todoList.map((todo) => (
            <TableRow key={todo.id}>
              <TableCell>{todo.title}</TableCell>
              <TableCell>{todo.description}</TableCell>
              <TableCell>{formatDate(todo.created_at)}</TableCell>
              <TableCell>{todo.finished_at||'Not finished Yet'}</TableCell>
              <TableCell>{todo.archive_at||'Not archived Yet'}</TableCell>
              <TableCell>{todo.checked ? 'Yes' : 'No'}</TableCell>
              <TableCell sx={{display:'flex'}}>
                <EditTodoDialog/>
                <DeleteTodoDialog
                 todoItemToBeDeletedId={todo.id} 
                setTodoList={setTodoList}
                />
                </TableCell>
              {/* <TableCell className={styles.todo_checkbox_wrapper}><input className={styles.todo_checkbox} type='checkbox' checked={todo.checked} onChange={() => { handleCheckTodoChange(todo) }} /></TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export { TodoListTable };
