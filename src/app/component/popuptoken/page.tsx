'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const PopUpToken = (authentification, signature) => {
    const [open, setOpen] = React.useState(false);
    setOpen(true);

    const handleClose = () => {
        setOpen(false);

    };
    const close = () => {
        //setOpen(false);
        window.location.href = 'http://localhost:3000/devices';
    };




    return (

        <React.Fragment>
            <Button onClick={handleClickOpen} style={{ backgroundColor: 'rgb(153, 27, 27)' }} className="border border-solid border-transparent hover:border-white">
                <DialogContentText id="color-text" style={{ color: 'white', textTransform: 'none' }}>
                    Token
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

                    <DialogContent>
                        <DialogContentText className='text-white flex justify-center' style={{ fontSize: '15px' }} id="alert-dialog-description">
                            The token for your device is :
                            <div className="relative">
                                {/* Zone de texte transparente */}
                                <textarea className="w-full" value={authentification}/>;
                            </div>
                        </DialogContentText>
                    </DialogContent>

                    <DialogContent>
                        <DialogContentText className='text-white' style={{ fontSize: '15px' }} id="alert-dialog-description">
                        <div>
                            Your device{'\''}s signature is :
                            {/* Zone d'affichage du texte saisi */}
                            {signature && (
                                    <div>
                                        {signature}
                                    </div>
                                )}
                            </div>

                        </DialogContentText>
                    </DialogContent>

                </DialogContent>

                <DialogActions style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textTransform: 'none' }}>
                    <div className="grid grid-cols-1 gap-5 " >
                        <Button onClick={close} style={{ textTransform: 'none' }} className='h-8 w-full flex mb-4 justify-center text-white transition-colors duration-150 rounded-[10px] bg-[#E55039] border border-solid border-white hover:border-white'>
                            Close
                        </Button>
                    </div>
                </DialogActions>
            </Dialog>
        </React.Fragment >
    );
}

export default PopUpToken;
