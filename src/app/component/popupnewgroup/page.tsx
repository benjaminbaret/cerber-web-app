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
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import supabase from '../../connexionDatabase/connectToDatabase';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";


const PopUpNewGroup = ({ selectedCheckboxIds }) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        if (!selectedCheckboxIds || selectedCheckboxIds.length === 0) {
            window.alert("Erreur, vous n'avez pas selectionné d'appareil à mettre dans le groupe");
            setOpen(false);
            return;
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const execute=async()=>{
        //console.log(selectedCheckboxIds);
        const inputNameGroup = document.getElementById('inputNameGroup') as HTMLInputElement;
        const groupName= inputNameGroup.value;
        const dateActuelle = new Date();
        const date = dateActuelle.toISOString();

        //faire requete sql pour creer un group
        const { data, error } = await supabase.from('groups').insert([{ name: groupName, updatedAt: date},]).select()
        if (error) {
            console.error('Erreur lors envoie des données :',error);
            return;
        }else{
            console.log(data[0].id);
            const idGroup=data[0].id;
            for (const deviceID of selectedCheckboxIds) {
                await supabase.from('devices').update({ groupeId: idGroup }).eq('id', deviceID);
            }
        }
        setOpen(false);
        window.location.href = 'http://localhost:3000/devices';
    }

    return (
        <React.Fragment>

            <Button
                onClick={handleClickOpen}
                style={{
                    backgroundColor: selectedCheckboxIds.length === 0 ? 'grey' : 'rgb(153, 27, 27)',
                }}
                className="border border-solid border-transparent hover:border-white"
            >
                <DialogContentText id="color-text" style={{ color: 'white', textTransform: 'none' }}>
                    <DeleteForeverIcon/> New Group
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
                    <div className="rounded-[10px]" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'rgb(229, 80, 57)' }}>
                        <DialogContent style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="flex justify-center w-full text-md">
                                <div className="grid grid-cols-2 gap-1" >
                                    <div className="flex justify-center " style={{ display: 'flex', alignItems: 'center',flexDirection: 'column' }}>
                                        <DialogContentText id="name-group" style={{ color: 'white' }}>
                                            Name of Group :
                                        </DialogContentText></div>
                                    <div className="">
                                        <input id="inputNameGroup" className="w-full text-black text-sm bg-white rounded h-8" style={{ paddingLeft: '8px', paddingRight: '8px' }} ></input>
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                    </div>
                </DialogContent>
                <DialogActions style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textTransform: 'none' }}>
                    <Button onClick={execute} style={{ textTransform: 'none' }} className="h-8 w-1/3 flex mb-4 justify-center text-white transition-colors duration-150 rounded-[15px] bg-[#E55039] border border-solid border-white hover:border-white" >
                    Create Group
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment >
    );
}

export default PopUpNewGroup;


