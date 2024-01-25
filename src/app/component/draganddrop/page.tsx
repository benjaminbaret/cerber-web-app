"use client"

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import BackupIcon from '@mui/icons-material/Backup';
import { Grid } from '@mui/material';
import process from "process";

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = '0';



const FileUploader: React.FC = () => {
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
    const onDrop = useCallback(async (acceptedFiles: File[])  => {
        if (!acceptedFiles) {
            return
        }
        const formData = new FormData()
        formData.append('file', acceptedFiles[0]);
        formData.append('filename', acceptedFiles[0].name);

        const response = await fetch(
            process.env.NEXT_PUBLIC_BASE_URL + '/api/minio-upload',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    body: formData,
                },
            }
        )
        if (response.ok) {
            console.log('Sucess!');

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
