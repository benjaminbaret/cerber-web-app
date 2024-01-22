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
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

//const PopUp = () => {

// return (
//     <main className="flex h-screen flex-col items-center bg-red-800">
//     <div className="">
//     <Image
//         className=""
//         src="/cerber-logo-white.png"
//         alt="Cerber Logo"
//         width={150}
//         height={150}
//         priority
//     />        
//     </div>
//     <div className="w-3/4 rounded-[20px] bg-red-800">
//         <div className="mx-10 m-5 bg-[#E55039] text-white rounded-[18px] pb-5">
//             <div className="flex justify-center text-lg">
//             </div>
//             <div className="flex mt-5">
//                 <div className="flex justify-center ml-5 w-1/3 text-md">
//                     Device Type :
//                 </div>
//                 <input className="w-2/3 text-black text-sm bg-white rounded ml-5 mr-5 text-center">
//                 </input>
//             </div>

//             <div className="flex mt-5">
//                 <div className="flex justify-center ml-5 w-1/3 text-md">
//                     Device Name :
//                 </div>

//                 <div className="w-2/3 mr-5 ml-5 bg-white rounded ">
//                 <DropdownDevice />
//                 </div>
//             </div>

//             <div className="flex mt-5">
//                 <div className="flex justify-center ml-5 w-1/3 text-md">
//                     Add to existing group :
//                 </div>
//                 <input className="w-2/3 text-black text-sm bg-white rounded ml-5 mr-5 text-center" type="password">
//                 </input>
//             </div>
//         </div>
//         <div className="flex justify-center">
//             <button
//             className="h-8 w-1/4 h-full flex justify-center text-white transition-colors duration-150 rounded-[20px] focus:shadow-outline shrink-0 bg-[#E55039] border border-solid border-white hover:border-transparent" type="button"
//             >
//             Add Device
//             </button>
//         </div>
//     </div>
// </main>
// );


const PopUpNewDevice = () => {

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
          <AddCircleOutlineIcon fontSize="small" className='mr-2' />
          New Device
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
            src="/cerber-logo-white.png" // Assurez-vous de mettre le bon chemin
            alt="Cerber Logo"
            width={150}
            height={150}
            priority
          />
          <div className="rounded-[10px]" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'rgb(229, 80, 57)' }}>
            <DialogContent style={{ display: 'flex', alignItems: 'center' }}>
              <div className="flex justify-center w-full text-md">

                <div className="grid grid-cols-2 gap-2" >
                  <div className="" style={{ display: 'flex', alignItems: 'center' }}>
                    <DialogContentText id="type-device" style={{ color: 'white' }}>
                      Device Type :
                    </DialogContentText></div>
                  <div className="bg-white rounded w-full" style={{ display: 'flex', alignItems: 'center' }}>
                    <DropdownDevice />
                  </div>
                  <div className="" style={{ display: 'flex', alignItems: 'center' }}>
                    <DialogContentText id="name-device" style={{ color: 'white' }}>
                      Device Name :
                    </DialogContentText></div>
                  <input
                    className="w-full text-black text-sm bg-white rounded h-8"
                    style={{ paddingLeft: '8px', paddingRight: '8px' }}

                  />
                  <div className="" style={{ display: 'flex', alignItems: 'center' }}>
                    <DialogContentText id="type-device" style={{ color: 'white' }}>
                      Add to an Existing Group:
                    </DialogContentText></div>
                  <div className="bg-white rounded w-full" style={{ display: 'flex', alignItems: 'center' }}>
                    <DropdownDevice />
                  </div>
                </div>
              </div>
            </DialogContent>
          </div>

        </DialogContent>

        <DialogActions style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textTransform: 'none' }}>
          <Button onClick={handleClose} style={{ textTransform: 'none' }} className="h-8 w-1/3 flex mb-4 justify-center text-white transition-colors duration-150 rounded-[15px] bg-[#E55039] border border-solid border-white hover:border-white" >
            Add Device
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment >
  );
}

export default PopUpNewDevice;
