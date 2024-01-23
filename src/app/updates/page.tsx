"use client"
import Navbar from "../component/header/navbar";
import React, { useEffect, useState } from 'react';
import Footer from "../component/footer/footer";
import PopUpUpdates from "../component/popupupdates/page";
import PopUpDeleteDevice from "../component/popupdeletedevice/page";
import SouthIcon from '@mui/icons-material/South';
import NorthIcon from '@mui/icons-material/North';
import SearchIcon from '@mui/icons-material/Search';
import supabase from '../connexionDatabase/connectToDatabase';




const handleDelete = () => {
    const [data, setData] = useState<any[]>([]);

    const handleDelete = async (itemId: any) => {
        // Simulation de la suppression côté client
        const newData = data.filter(item => item.id !== itemId);
        setData(newData);

        // Requête SQL pour suppression côté serveur à l'aide de Supabase
        try {
            const {data: deletedData, error} = await supabase
                .from('Update')
                .delete()
                .eq('id', itemId);

            if (error) {
                console.error('Erreur lors de la suppression des données:', error);
            } else {
                console.log('Données supprimées avec succès:', deletedData);
            }
        } catch (error) {
            console.error('Erreur lors de la suppression des données:', error);
        }
    }
};

////////////////////////////////////////////// REVOIR //////////////////////////////////////////////
/*const uploadFileFunction = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleUpload = () => {
        if (selectedFile) {
            // Vous pouvez utiliser l'API Fetch ou Axios pour envoyer le fichier au serveur
            // Ici, nous faisons simplement une simulation et n'envoyons pas réellement de fichier
            console.log('Envoi du fichier au serveur:', selectedFile);

            // Après avoir téléchargé le fichier, vous pouvez effectuer des requêtes SQL pour mettre à jour la page
            // Example:
            /* const { data, error } = await supabase.from('ma_table').update({  Vos données de mise à jour ici  });*/
/*} else {
    console.error('Aucun fichier sélectionné.');
}
};*/
////////////////////////////////////////////// REVOIR //////////////////////////////////////////////

const inputSearchName = async () => {
    const inputElement = document.getElementById('searchInputName') as HTMLInputElement;

    if (inputElement) {
        const inputValue = inputElement.value.trim();

        if (inputValue !== '') {
            try {
                const { data, error } = await supabase
                    .from('Update')
                    .select('*')
                    .ilike('name', `%${inputValue}%`);


                if (error) {
                    console.error('Erreur lors de la recherche des données:', error);
                } else {
                    console.log('Résultat de la recherche:', data);
                    // Mettez à jour votre état local ou effectuez d'autres actions avec les données de la recherche
                }
            } catch (error) {
                console.error('Erreur lors de la recherche des données:', error);
            }

            inputElement.value = ''; // Réinitialise la valeur de l'input après la recherche
        } else {
            console.log("La zone input est vide.");
        }
    }
};


const AscendingSortFunctionDate = async () => {
    const [sortedata, setSorteData] = useState([]);

    useEffect(() => {
        // Fonction pour récupérer les données triées par ordre croissant
        const fetchSortedData = async () => {
            const {data, error} = await supabase
                .from('Update') // Remplacez 'ma_table' par le nom de votre table
                .select('*')
                .order('updatedAt', {ascending: true});

            if (error) {
                console.error('Erreur lors de la récupération des données depuis Supabase:', error);
            } else {
                setSorteData(sortedata);
                console.log('Données triées par ordre croissant:', data);
            }
        };

        fetchSortedData();
    }, []) // Assure que la requête est effectuée une seule fois au montage du composant
};


const DescendingSortFunctionDate = () => {
    const [sortedata, setSorteData] = useState<any[]>([]);

    useEffect(() => {
        // Fonction pour récupérer les données triées par ordre décroissant
        const fetchSortedData = async () => {
            const {data, error} = await supabase
                .from('Update')
                .select('*')
                .order('updatedAt', {ascending: false});

            if (error) {
                console.error('Erreur lors de la récupération des données depuis Supabase:', error);
            } else {
                setSorteData(data as any[]);
                console.log('Données triées par ordre décroissant:', data);
            }
        };

        fetchSortedData();
    }, [])
};

const AscendingSortFunctionSize = () => {
    const [sortedata, setSorteData] = useState<any[]>([]);

    useEffect(() => {
        // Fonction pour récupérer les données triées par ordre croissant
        const fetchSortedData = async () => {
            const { data, error } = await supabase
                .from('Update')
                .select('*')
                .order('size', { ascending: true });

            if (error) {
                console.error('Erreur lors de la récupération des données depuis Supabase:', error);
            } else {
                setSorteData(data as any[]);
                console.log('Données triées par ordre décroissant:', data);
            }
        };
        fetchSortedData();
    }, [])
};


const DescendingSortFunctionSize = () => {
    const [sortedata, setSorteData] = useState<any[]>([]);

    useEffect(() => {
        // Fonction pour récupérer les données triées par ordre décroissant
        const fetchSortedData = async () => {
            const { data, error } = await supabase
                .from('Update')
                .select('*')
                .order('size', { ascending: false });

            if (error) {
                console.error('Erreur lors de la récupération des données depuis Supabase:', error);
            } else {
                setSorteData(data as any[]);
                console.log('Données triées par ordre décroissant:', data);
            }
        };

        fetchSortedData();
        }, [])
    };

    const selectAll = () => {
        const inputElement = document.getElementById('selectAllId') as HTMLInputElement;
        if (inputElement) {
            inputElement.checked = !inputElement.checked;
            if (inputElement.checked) {
                console.log("Il faut cocher toutes les cases");
                const elements = document.querySelectorAll<HTMLInputElement>('[id^="select"]');
                elements.forEach((element) => {
                    element.checked = true;
                });

            } else {
                console.log("Il faut décocher toutes les cases");
                const elements = document.querySelectorAll<HTMLInputElement>('[id^="select"]');
                elements.forEach((element) => {
                    element.checked = false;
                });
            }
        }
    };

    const contenuDisplay: (tableauContenu: string[][]) => React.ReactNode = (tableauContenu) => {
        return (
            <tbody>
            {tableauContenu.map((ligne, indexLigne) => (
                // eslint-disable-next-line react/jsx-key
                <tr className="relative">
                    <td className=" text-center className='w-1/7'">
                        <input type="checkbox" id={"select" + indexLigne} name={"select" + indexLigne}/>
                    </td>
                    <td id={"name"} className="pb-3 pt-3 flex items-center justify-center text-center w-1/7">
                        {ligne[0]}
                    </td>
                    <td className="text-center className='w-1/7'">
                        {ligne[1]}
                    </td>
                    <td className="text-center className='w-1/7'">
                        {ligne[2]}
                    </td>
                    <style jsx>{`
                        tr::after {
                            content: "";
                            position: absolute;
                            left: 0;
                            bottom: 0;
                            width: 100%;
                            height: 1px;
                            background-color: #e2e8f0;
                            opacity: 0.28;
                        }
                    `}</style>
                </tr>
            ))}
            </tbody>
        );
    };

    const UpdatesPage = () => {
        const [tableauContenu, setTableauContenu] = useState<string[][]>([]);
        useEffect(() => {
            const lireFichier = async () => {
                try {
                    const cheminFichier = 'text/file2.txt';
                    const reponse = await fetch(cheminFichier);
                    const contenuFichier = await reponse.text();
                    const lignes = contenuFichier.split('\n');
                    const nouveauTableau = lignes.map((ligne) => ligne.split(' '));
                    console.log(nouveauTableau);
                    setTableauContenu(nouveauTableau);
                } catch (erreur) {
                    console.error('Erreur lors de la lecture du fichier :', erreur);
                }
            };
            lireFichier();
        }, []);

        return (

            <div className="bg-darkPurple text-white">

                <div>
                    <Navbar currentPage="updates" />
                </div>

                    <div className="flex justify-center items-center">
                        <div className="grid grid-cols-2 gap-5">
                            <PopUpUpdates />
                            <PopUpDeleteDevice />
                        </div>
                    </div>

                    <div id="pageContent" className="w-full bg-darkPurple text-white justify-between items-center h-full">
                    <table className="w-full mt-5 mb-6 justify-between items-center h-full relative ">
                        <thead className=" w-full bg-darkPurple z-50 bg-intermediatePurple text-md">
                            <tr>
                                <th key="column1" id="selectAllId" className="w-1/4">
                                    <div className="flex flex-col items-center justify-center">
                                        <div>Select All</div>
                                        <div className="flex items-center justify-center pt-2 pb-2">
                                            <input onChange={selectAll} type="checkbox" id="selectAll" name="selectAll" />
                                        </div>
                                    </div>
                                </th>

                                <th key="column3" className="w-1/4">
                                    <div className="flex flex-col items-center justify-center">
                                        <div>Software</div>
                                        <div className="flex items-center justify-center pt-2 pb-2">
                                            <SearchIcon fontSize="medium" className="h-5" onClick={inputSearchName} />
                                            <input type="text" id="searchInputSoft" className="text-black text-xs rounded-full" style={{ paddingLeft: '8px', paddingRight: '8px' }} />
                                        </div>
                                    </div>
                                </th>

                                <th key="column2" className="w-1/4">
                                    <div className="flex flex-col items-center justify-center">
                                        <div>Date/Time</div>
                                        <div className="flex items-center justify-center pt-2 pb-2">
                                            <SouthIcon className="h-4 mr-1" onClick={AscendingSortFunctionDate} />
                                            <NorthIcon className="h-4 mt-1 mb-1" onClick={DescendingSortFunctionDate} />
                                        </div>
                                    </div>
                                </th>
                                <th key="column4" className="w-1/4">
                                    <div className="flex flex-col items-center justify-center">
                                        <div>Size</div>
                                        <div className="flex items-center justify-center pt-2 pb-2">
                                            <div className="flex items-center justify-center">
                                                <SouthIcon className="h-4 mr-1" onClick={AscendingSortFunctionSize} />
                                                <NorthIcon className="h-4 mt-1 mb-1" onClick={DescendingSortFunctionSize} />
                                            </div>
                                        </div>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                            {contenuDisplay(tableauContenu)}
                    </table>

                </div>
            <Footer />
        </div>
    );
};

export default UpdatesPage;