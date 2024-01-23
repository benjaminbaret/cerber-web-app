'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const PopUpDeleteDevice = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button onClick={handleClickOpen} style={{ backgroundColor: 'rgb(153, 27, 27)' }} className="border border-solid border-transparent hover:border-white">
                <DialogContentText id="color-text" style={{ color: 'white', textTransform: 'none' }}>
                <DeleteForeverIcon/>  Delete File
                </DialogContentText>
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    style: {
                        background: 'linear-gradient(to top, rgb(153, 27, 27), rgb(229,80,57))',
                        borderRadius: '10px',
                        minWidth: '400px',
                    },
                }}
            >

                <DialogContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <ErrorOutlineIcon fontSize="large" style={{ color: 'white' }}/>
                    <DialogTitle id="alert-dialog-title" className='text-white' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textTransform: 'none', fontSize: '23px' }}>
                        {"Are you sure ?"}
                    </DialogTitle>

                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: 'white',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <DialogContent>
                        <DialogContentText className='text-white flex justify-center' style={{ fontSize: '12px' }} id="alert-dialog-description">
                            This action cannot be undone.
                        </DialogContentText>
                    </DialogContent>

                </DialogContent>

                <DialogActions style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textTransform: 'none' }}>
                    <div className="grid grid-cols-2 gap-5 " >
                        <Button onClick={handleClose} style={{ textTransform: 'none' }} className='h-8 w-full flex mb-4 justify-center text-white transition-colors duration-150 rounded-[10px] bg-[#E55039] border border-solid border-white hover:border-white'>Yes, continue</Button>
                        <Button onClick={handleClose} style={{ textTransform: 'none' }} className='h-8 w-full flex mb-4 justify-center text-white transition-colors duration-150 rounded-[10px] bg-[#E55039] border border-solid border-white hover:border-white' autoFocus>
                            No, go back
                        </Button>
                    </div>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default PopUpDeleteDevice;
