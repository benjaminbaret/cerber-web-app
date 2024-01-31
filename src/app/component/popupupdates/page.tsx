'use client';

import Image from 'next/image';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import UploadIcon from '@mui/icons-material/Upload';
import FileUploader from '../draganddrop/page';

const PopUpUpdates = () => {

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
                    <UploadIcon className='mr-1' />
                    Upload
                </DialogContentText>
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    style: {
                        background: 'linear-gradient(to top, rgb(153, 27, 27), rgb(229,80,57))', // Dégradé de couleur du rouge au rouge vif
                        borderRadius: '10px',
                        minWidth: '500px',
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
                        src="/images/cerber-logo-white.png"
                        alt="Cerber Logo"
                        width={150}
                        height={150}
                        priority
                    />
                    <div className="rounded-[10px] w-full" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'rgb(255, 255, 255)' }}>
                        <DialogContent style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="flex justify-center w-full text-md">
                                <div className="flex justify-center " style={{ display: 'flex', alignItems: 'center',flexDirection: 'column' }}>
                                <div className="">
                                    <FileUploader/>
                                </div>
                                </div>
                            </div>
                        </DialogContent>
                    </div>

                </DialogContent>

                <DialogActions style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textTransform: 'none' }}>
                    <Button onClick={handleClose} style={{ textTransform: 'none' }} className="h-8 w-1/3 flex mb-4 justify-center text-white transition-colors duration-150 rounded-[15px] bg-[#E55039] border border-solid border-white hover:border-white w-2/3" >
                        Add Update
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment >
    );
}

export default PopUpUpdates;