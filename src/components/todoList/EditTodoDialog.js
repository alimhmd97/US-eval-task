//  EditTodoModal;
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { useState } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

export function EditTodoDialog({ todoItemToUpdate, setTodoList }) {
    // ------------------------------------------------------------------------------------------------
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    // ------------------------------------------------------------------------------------------------
    const [updatedTodoItem, setUpdatedTodoItem] = useState({ ...todoItemToUpdate });

    const updateTodo = (e) => {
        e.preventDefault();
        setTodoList(prev => {
            prev?.splice(prev.map(elem => elem.id).indexOf(todoItemToUpdate.id), 1, updatedTodoItem)
            localStorage.setItem('todoList', JSON.stringify([ ...prev ]));
            return [ ...prev ]
        })
        handleClose()
    }
    // ------------------------------------------------------------------------------------------------
    const handleCheckArchiveAtChange = () => {
        if (updatedTodoItem.archive_at) {
            setUpdatedTodoItem(prev => ({ ...prev, archive_at: undefined }))
        } else {
            setUpdatedTodoItem(prev => ({ ...prev, archive_at: new Date().getTime() }))
        }
    }
    // ------------------------------------------------------------------------------------------------
    const handleCheckFinishedAtChange = () => {
        if (updatedTodoItem.finished_at) {
            setUpdatedTodoItem(prev => ({ ...prev, finished_at: undefined }))
        } else {
            setUpdatedTodoItem(prev => ({ ...prev, finished_at: new Date().getTime() }))
        }
    }
    // ------------------------------------------------------------------------------------------------
    const handleCheckedChange = () => {
        setUpdatedTodoItem(prev => ({ ...prev, checked: !prev.checked }))
    }
    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                <EditTwoToneIcon />
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={updateTodo}>

                    <DialogTitle>Edit todo item</DialogTitle>
                    <DialogContent>

                        <TextField
                            inputProps={{
                                required: true,
                            }}
                            value={updatedTodoItem.title}
                            onChange={(e) => {
                                setUpdatedTodoItem(prev => ({ ...prev, title: e.target.value }))
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
                            value={updatedTodoItem.description}
                            onChange={(e) => {
                                setUpdatedTodoItem(prev => ({ ...prev, description: e.target.value }))
                            }}
                            margin="dense"
                            id="description"
                            label="Description"
                            type="text"
                            variant="outlined"
                        />
                        <FormControlLabel control={<Checkbox checked={!!updatedTodoItem.archive_at} color="secondary" onChange={handleCheckArchiveAtChange} />} label="Archive" />
                        <FormControlLabel control={<Checkbox checked={!!updatedTodoItem.finished_at} color="success" onChange={handleCheckFinishedAtChange} />} label="Finished" />
                        <FormControlLabel control={<Checkbox checked={!!updatedTodoItem.checked} color="default" onChange={handleCheckedChange} />} label="Checked" />

                    </DialogContent>
                    <DialogActions>
                        <Button type='button' onClick={handleClose}>Cancel</Button>
                        <Button type='submit' >Update</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}
