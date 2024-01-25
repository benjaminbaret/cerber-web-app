'use client'

import Image from 'next/image';
import DropdownDevice from '../dropdown/DDDGroup';
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
import Cookies from "js-cookie";
import crypto from "crypto";
import supabase from '../../connexionDatabase/connectToDatabase';
//import PopUpToken from '../popuptoken/page';

const PopUpNewDevice = () => {
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [group, setGroup] = useState('');
  const [open, setOpen] = React.useState(false);
  const [groupList, setGroupList] = useState([]);
  useEffect(() => {
    displayGroups();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  function generateRandomId(): number {
    return Math.floor(100000 + Math.random() * 900000);
  }
  const handleClose = () => {
    setOpen(false);
  };
  function generateRandomKey(): string {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let randomKey = '';
    for (let i = 0; i < 24; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomKey += characters.charAt(randomIndex);
    }
    return randomKey;
  }
  const displayGroups = async () => {
    try {
      const { data, error } = await supabase.from('groups').select('name');
      console.log(data.names)
      if (error) {
        console.error('Erreur lors de la récupération des groupes :', error);
        return;
      }
      // Mettre à jour l'état avec la liste des groupes
      setGroupList(data.map(group => group.name));
    } catch (error) {
      console.error('Erreur inattendue lors de la récupération des groupes :', error);
    }
  };
  const hashPassword = (password: string) => {
    const sha256 = crypto.createHash('sha256');
    sha256.update(password, 'utf8');
    const hashedPass = sha256.digest('hex');
    return hashedPass;
  };
  const generateId=async() =>{
    type MyNumber = number;
    let randomId: MyNumber = generateRandomId();
    const { data, error } = await supabase.from('devices').select('*').eq('signature', randomId);
    if (error) {
      console.error('Erreur lors envoie des données :',error);
      return;
    }
    while (data && data.length > 0) {
      randomId = generateRandomId();
      const { data, error } = await supabase.from('devices').select('*').eq('signature', randomId);
      if (error) {
        console.error('Erreur lors envoie des données :',error);
        return;
      }
    }
    return randomId;
  }

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
      const randomId: string = await generateId();

      //Générer une clé sécurisée de 24 caractères
      const randomKey: string = generateRandomKey();

      //Chiffrer clé 24 caractères:
      const randomKeyHashed: string = hashPassword(randomKey);

      //récupérer l'ID de l'utilisateur
      ///TODO metttre vrais cookies quand ca remarchera
      const userId = "2";
      console.log("coucou");
      const intValue = parseInt(userId, 10);


      //Récupérer l'ID du group si l'appareil en a un
      ///TODO QUAND ON AURA LA CATEGORIE GROUPE
      const inputGroupElement = document.getElementById('groupValue') as HTMLInputElement;
      const { data2, error2 } = await supabase.from('groups').select('id').eq('name', inputGroupElement.value);
      if (error2) {
        console.error('Erreur lors envoie des données :', error2);
        return;
      }
      let groupId = "";
      console.log(data2);
      if (data2?.length > 0) {
        groupId = data2[0].value;
        console.log("caca")
      }else{
        groupId="";
      }
      console.log(groupId);
      const { data, error } = await supabase.from('devices').insert([{ name: name, type: type, hash:randomKeyHashed,signature:randomId, userId:userId, updatedAt:time, groupeId:groupId },]).select()
      window.alert("Authentification Token : "+randomKey+"\nSignature : "+ randomId);
      if (error) {
        console.error('Erreur lors envoie des données :', error);
        return;
      }
    } catch (error) {
      console.error('Erreur inattendue :', error);
    }
    setOpen(false);
    window.location.href = 'http://localhost:3000/devices';
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
                    </DialogContentText>
                  </div>
                  <input
                      onChange={(e) => setType(e.target.value)}
                      value={type}
                      id="type-simple-select"
                      className="w-full text-black text-sm bg-white rounded h-8"
                      style={{ paddingLeft: '8px', paddingRight: '8px' }}
                  />

                  <div className="" style={{ display: 'flex', alignItems: 'center' }}>
                    <DialogContentText id="name-device" style={{ color: 'white' }}>
                      Device Name :
                    </DialogContentText>
                  </div>
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
                            id="groupValue"
                            value={group}
                            label="Group"
                            onChange={(e) => setGroup(e.target.value)}
                        >
                          {/* Utiliser le nouvel état groupList au lieu de l'appel de la fonction displayGroups */}
                          {groupList.map((groupName, index) => (
                              <MenuItem key={index} value={groupName}>
                                {groupName}
                              </MenuItem>
                          ))}
                          <MenuItem value="">[no group]</MenuItem>
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
