
import { formatDate } from '../../helpers/helpers';
import { DeleteTodoDialog } from './DeleteTodoDialog';
import { EditTodoDialog } from './EditTodoDialog';
import styles from './todo.module.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tooltip } from '@mui/material';

function TodoListTable({ todoList, setTodoList }) {
  // const handleCheckTodoChange = (todoItem) => {
  //  const updatedTodoItem={...todoItem,checked:!todoItem.checked}
  //   todoList?.splice(todoList.map(elem=>elem.id).indexOf(todoItem.id), 1,updatedTodoItem)
  //   setTodoList([...todoList])
  //   localStorage.setItem('todoList',JSON.stringify(todoList))
  // }
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
              <TableCell className={styles.ellipsis_text}><Tooltip title={todo.title||''}><span>{todo.title}</span></Tooltip></TableCell>
              <TableCell className={styles.ellipsis_text}><Tooltip title={todo.description||''}><span>{todo.description}</span></Tooltip></TableCell>
              <TableCell className={styles.ellipsis_text}><Tooltip title={formatDate(todo.created_at)}><span>{formatDate(todo.created_at)}</span></Tooltip></TableCell>
              <TableCell className={styles.ellipsis_text}><Tooltip title={todo.finished_at?formatDate(todo.finished_at):'Not finished Yet'}><span>{todo.finished_at?formatDate(todo.finished_at):'Not finished Yet'}</span></Tooltip></TableCell>
              <TableCell className={styles.ellipsis_text}><Tooltip title={todo.archive_at?formatDate(todo.archive_at):'Not archived Yet'}><span>{todo.archive_at?formatDate(todo.archive_at):'Not archived Yet'}</span></Tooltip></TableCell>
              <TableCell className={styles.ellipsis_text}><Tooltip title={todo.checked ? 'Checked' : 'Not checked'}><span>{todo.checked ? 'Checked' : 'Not checked'}</span></Tooltip></TableCell>
              <TableCell sx={{display:'flex'}}>
                <EditTodoDialog 
                todoItemToUpdate={todo} setTodoList={setTodoList}/>
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
