import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import { useState } from 'react';
import { Snackbar } from '@mui/material';

export function AddTodoDialog({ todoList, setTodoList }) {
    const [showSnackbar, setShowSnackbar] = useState(false);
    // --------------------------------------------------------------------------------------------
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    // --------------------------------------------------------------------------------------------
    const [todoItem, setTodoItem] = useState({
        title: '',
        description: ''
    });
    const addTodo = (e) => {
        e.preventDefault();
        const newTodoitem = {
            ...todoItem,
            id: todoList[todoList?.length - 1]?.id + 1,
            created_at: new Date().getTime(),
            cheched: false,
            finished_at: undefined,
            archive_at: undefined,
        }
        setTodoList(prev => {
            localStorage.setItem('todoList', JSON.stringify([...prev, newTodoitem]))
            return [...prev, newTodoitem]
        })

        setShowSnackbar(true)
        setTimeout(() => {
            setShowSnackbar(false)

        }, 3000);
        handleClose()

    }
    return (
        <div>
            <Button variant="outlined" color='inherit' onClick={handleClickOpen}>
                <AddCircleTwoToneIcon /> Add Todo
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={addTodo}>
                    <DialogTitle> Add Todo</DialogTitle>
                    <DialogContent>

                        <TextField
                            inputProps={{
                                required: true,
                            }}
                            value={todoItem.title}
                            onChange={(e) => {
                                setTodoItem(prev => ({ ...prev, title: e.target.value }))
                            }}
                            margin="dense"
                            id="title"
                            label="Title"
                            type="text"
                            variant="outlined"
                            sx={{ marginRight: '10px' }}
                        />
                        <TextField
                            inputProps={{
                                required: true,
                            }}
                            value={todoItem.description}
                            onChange={(e) => {
                                setTodoItem(prev => ({ ...prev, description: e.target.value }))
                            }}
                            margin="dense"
                            id="description"
                            label="Description"
                            type="text"
                            variant="outlined"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button type='button' onClick={handleClose}>Cancel</Button>
                        <Button type='submit' >Add</Button>
                    </DialogActions>
                </form>
            </Dialog>
            <Snackbar
                open={showSnackbar}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Todo Added successfully"
            />
        </div>
    );
}