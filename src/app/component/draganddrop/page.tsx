"use client"

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import BackupIcon from '@mui/icons-material/Backup';
import { Grid } from '@mui/material';
import process from "process";
import supabase from "../../connexionDatabase/connectToDatabase";

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = '0';



const FileUploader: React.FC = () => {
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
    const onDrop = useCallback(async (acceptedFiles: File[])  => {
        if (!acceptedFiles) {
            return
        }
        const formData = new FormData();
        formData.append('nameFile', acceptedFiles[0].name);
        formData.append('file', acceptedFiles[0]);
        {/*TODO send user id*/}
        formData.append('bucketName', 'kaka')

        const response = await fetch(
            process.env.NEXT_PUBLIC_BASE_URL + '/api/minio-upload',
            {
                method: 'POST',
                body: formData,
            }
        );

        if (response.ok) {
            const back = await response.text();
            console.log('Sucess!');
            const dateActuelle = new Date();
            const time = dateActuelle.toISOString();
            const { data, error } = await supabase.from('updates').insert([{updatedAt:time, url: back, name: acceptedFiles[0].name, size:acceptedFiles[0].size },]).select()
            if(error){
                console.error('Erreur lors envoie des données :',error);
                return;
            }
            console.log('Données envoyées avec succès :', data);
            window.location.href = 'http://localhost:3000/updates';
        } else {
            console.error(`Error: ${response.status} - ${response.statusText}`);
        }
    }, []);


    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div >
            <div {...getRootProps()} className='flex items-center'style={{ ...dropzoneStyles, color: 'grey', textTransform: 'none'}}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                
                <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <input {...getInputProps() } />
                        {isDragActive ? (
                            <p>Drop the files here ...</p>
                        ) : (
                            <p>Drag & Drop Zone</p>
                        )}
                </Grid>  

                <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <div className=''><BackupIcon /></div>
                </Grid>             
            </Grid>   
            </div>

            {uploadedFiles.length > 0 && (
                <div style={fileListStyles}>
                    <p>Uploaded Files:</p>
                    <ul>
                        {uploadedFiles.map((fileName, index) => (
                            <li key={index}>{fileName}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

const dropzoneStyles = {
    border: '1px dashed #aaaaaa',
    borderRadius: '4px',
    padding: '10px',
    cursor: 'pointer',
    minWidth: '400px',
    maxHeight: '150px',
    minHeight: '100px',
    backgroundColor: '#f0f0f0',
};

const fileListStyles = {
    marginTop: '20px',
};

export default FileUploader;
