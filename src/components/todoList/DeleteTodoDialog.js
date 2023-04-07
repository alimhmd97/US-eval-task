//  DeleteTodoModal;
//  EditTodoModal;
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';

export function DeleteTodoDialog({ todoItemToBeDeletedId,setTodoList }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    // ------------------------------------------------------------------------------------------------
    const handleDeletetodoItem = () => {
        setTodoList(prev => {
            const newTodoList = prev.filter(todoItem => todoItem.id !== todoItemToBeDeletedId)

            localStorage.setItem('todoList', JSON.stringify(newTodoList))
            return newTodoList
        })
    }
    return (
        <div>
            <Button sx={{ marginLeft: '10px' }} variant="outlined" color='error' onClick={handleClickOpen}>
                <DeleteForeverTwoToneIcon />
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Delete Confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this todo item?
                    </DialogContentText>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDeletetodoItem}>Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
