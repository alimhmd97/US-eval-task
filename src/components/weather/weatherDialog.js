
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CurrentWeather } from './weather';
import { FiveDaysWeather } from './fiveDaysWeather';

export function WeatherDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }
    return (
        <div>
            <Button sx={{
                position: 'absolute',
                bottom: '10px',
                right: '10px'
            }} variant="outlined" onClick={handleClickOpen}>
                <CurrentWeather />
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>

                    <FiveDaysWeather />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
