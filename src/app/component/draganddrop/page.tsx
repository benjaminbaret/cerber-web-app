import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import BackupIcon from '@mui/icons-material/Backup';
import { Grid } from '@mui/material';

const FileUploader: React.FC = () => {
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        // Do something with the uploaded files, e.g., send them to a server
        console.log('Accepted Files:', acceptedFiles);

        // Extract and set the names of the uploaded files
        const fileNames = acceptedFiles.map(file => file.name);
        setUploadedFiles(fileNames);
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
