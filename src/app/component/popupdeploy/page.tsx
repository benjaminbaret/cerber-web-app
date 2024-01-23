'use client';

import Image from 'next/image';
import DropdownDevice from '../dropdown/dropdown';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PublishIcon from '@mui/icons-material/Publish';

const PopUpDeploy = () => {

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
                    <PublishIcon/> Deploy
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
                        minWidth : '500px',
                    },
                }}
            >

                <DialogContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

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
                    <Image
                        className=""
                        src="/images/cerber-logo-white.png" // Assurez-vous de mettre le bon chemin
                        alt="Cerber Logo"
                        width={150}
                        height={150}
                        priority
                    />

                    <div className="rounded-[10px] w-full" style={{flexDirection: 'column', alignItems: 'center', backgroundColor: 'rgb(229, 80, 57)' }}>
                        
                        <DialogContent className="justify-center w-full pt-4 pb-1 " style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }} >
                            <div className="grid grid-cols-4 gap-2 w-full">
                                <div className="flex justify-center" style={{ display: 'flex', alignItems: 'center' }}>
                                    <DialogContentText id="type-device" style={{ color: 'white' }}>
                                        Select :
                                    </DialogContentText>
                                </div>

                                <div className="bg-white rounded w-full" style={{ display: 'flex', alignItems: 'center' }}>
                                    <DropdownDevice />
                                </div>

                                <div className="flex justify-center" style={{ display: 'flex', alignItems: 'center' }}>
                                    <DialogContentText id="name-device" style={{ color: 'white' }}>
                                        Or :
                                    </DialogContentText>
                                </div>

                                <div className="bg-white rounded w-full" style={{ display: 'flex', alignItems: 'center' }}>
                                    <DropdownDevice />
                                </div>
                            </div>

                            </DialogContent>
                            
                            <DialogContent className="pb-1">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="flex justify-center" style={{ display: 'flex', alignItems: 'center' }}>
                                    <DialogContentText id="type-device" style={{ color: 'white' }}>
                                        Select :
                                    </DialogContentText>
                                </div>

                                <div className="bg-white rounded w-full" style={{ display: 'flex', alignItems: 'center' }}>
                                    <DropdownDevice />
                                </div>
                            </div>
                            </DialogContent>

                            <DialogContent className="pb-4">
                            <div className="grid grid-cols-2 gap-1">
                                <div className="flex justify-center" style={{ display: 'flex', alignItems: 'center' }}>
                                    <DialogContentText id="type-device" style={{ color: 'white'}}>
                                        Schedule :
                                    </DialogContentText>
                                </div>

                                <div className="bg-white rounded w-full" style={{ display: 'flex', alignItems: 'center' }}>
                                    <DropdownDevice />
                                </div>
                            </div>
                            </DialogContent>
                    </div>

                </DialogContent>

                <DialogActions style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textTransform: 'none' }}>
                    <Button onClick={handleClose} style={{ textTransform: 'none' }} className="h-8 w-1/3 flex mb-4 justify-center text-white transition-colors duration-150 rounded-[15px] bg-[#E55039] border border-solid border-white hover:border-white" >
                        Deploy
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment >
    );
}

export default PopUpDeploy;
