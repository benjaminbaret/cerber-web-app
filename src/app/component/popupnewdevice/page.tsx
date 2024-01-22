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
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import supabase from "../../connexionDatabase/connectToDatabase";
import Cookies from "js-cookie";



const PopUpNewDevice = () => {
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [group, setGroup] = useState('');
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleAddnewDevice  = async () => {
    console.log('test');
    console.log('type :', type);
    console.log('name :', name);
    console.log('group :', group);
    try {
      const dateActuelle = new Date();
      const time = dateActuelle.toISOString();
      console.log(`Heure actuelle: ${time}`);
      //générer un ID de 6 chiffres et verifier dans la base de données s'il existe. S'il existe alors en regenerer un sinon on garde


      /*const { data, error } = await supabase.from('devices').insert([{ name: name, type: type, hash:hashedPassword,signature:signature, userId:userId, updatedAt:time, groupId:groupId },]).select()

      if (error) {
        console.error('Erreur lors envoie des données :', error);
        return;
      }else{
        const { data, error } = await supabase.from('users').select('*').eq('email', email);
        if (error) {
          console.error('Erreur lors de la récupération des données :', error);
          return;
        }
        if (data && data.length > 0) {
          const user = data[0];
          console.log('Connexion réussie !');
          Cookies.set('id', user.id);
          Cookies.set('username', user.username);
          window.location.href = 'http://localhost:3000/dashboard';
        } else {
          console.log('Utilisateur non trouvé.');
        }
      }*/
    } catch (error) {
      console.error('Erreur inattendue :', error);
    }
  }

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
            src="/images/cerber-logo-white.png" // Assurez-vous de mettre le bon chemin
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
                    <Box style={{ width: '100%' }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="type-simple-select"
                            value={type}
                            label="Type"
                            onChange={(e) => setType(e.target.value)}>
                          <MenuItem value="Rasp">Rasp</MenuItem>
                          <MenuItem value="esp">esp</MenuItem>
                          <MenuItem value="arduino">arduino</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </div>
                  <div className="" style={{ display: 'flex', alignItems: 'center' }}>
                    <DialogContentText id="name-device" style={{ color: 'white' }}>
                      Device Name :
                    </DialogContentText></div>
                  <input
                      onChange={(e) => setName(e.target.value)} value={name}
                      id="name-device-input"
                      className="w-full text-black text-sm bg-white rounded h-8"
                      style={{ paddingLeft: '8px', paddingRight: '8px' }}
                  />
                  <div className="" style={{ display: 'flex', alignItems: 'center' }}>
                    <DialogContentText id="type-device" style={{ color: 'white' }}>
                      Add to an Existing Group:
                    </DialogContentText></div>
                  <div className="bg-white rounded w-full" style={{ display: 'flex', alignItems: 'center' }}>
                    <Box style={{ width: '100%' }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Group</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={group}
                            label="Group"
                            onChange={(e) => setGroup(e.target.value)}>
                          <MenuItem value="[no group]">[no group]</MenuItem>
                          <MenuItem value="Group1">Group1</MenuItem>
                          <MenuItem value="Group2">Group2</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </div>
                </div>
              </div>
            </DialogContent>
          </div>

        </DialogContent>

        <DialogActions style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textTransform: 'none' }}>
          <Button onClick={handleAddnewDevice} style={{ textTransform: 'none' }} className="h-8 w-1/3 flex mb-4 justify-center text-white transition-colors duration-150 rounded-[15px] bg-[#E55039] border border-solid border-white hover:border-white" >
            Add Device
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment >
  );
}

export default PopUpNewDevice;
