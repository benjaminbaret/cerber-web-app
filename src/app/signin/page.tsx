'use client';

import { useState } from 'react';
import Link from 'next/link';
import supabase from '../connexionDatabase/connectToDatabase';
const crypto = require('crypto');
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import SouthIcon from '@mui/icons-material/South';
import NorthIcon from '@mui/icons-material/North';

export default function SigninPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async () => {
        console.log('Connexion en cours...');
        console.log('email :', email);
        console.log('password :', password);

        const hashPassword = (password: string) => {
            const sha256 = crypto.createHash('sha256');
            sha256.update(password, 'utf8');
            const hashedPassword = sha256.digest('hex');
            return hashedPassword;
        };
        const hashedPassword = hashPassword(password);
        try {
            const { data, error } = await supabase.from('users').select('*').eq('email', email);
            if (error) {
                console.error('Erreur lors de la récupération des données :', error);
                return;
            }
            if (data && data.length > 0) {
                const user = data[0];
                if (user.hash === hashedPassword) {
                    console.log('Connexion réussie !');
                    Cookies.set('id', user.id);
                    Cookies.set('username', user.username);
                    window.location.href = 'http://localhost:3000/dashboard';
                } else {
                    console.log('Mot de passe incorrect.');
                }
            } else {
                console.log('Utilisateur non trouvé.');
            }
        } catch (error) {
            console.error('Erreur inattendue :', error);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center p-24 bg-zinc-300">
            
                <div className="">
                    <img
                        className=""
                        src="images/cerber-logo-red.png"
                        alt="Cerber Logo"
                        width={200}
                        height={200}
                    />
                </div>
                <div className="w-3/4 rounded-[20px] bg-rose-800">
                    <div className="flex m-5 justify-center">
                        <Link href="/signup" className="w-1/4 h-1/2 text-center text-lg bg-[#E55039] text-white border border-white rounded-l-full hover:border-stone-500">SIGN IN </Link>
                        <Link href="/signup" className="w-1/4 h-1/2 text-center text-lg bg-rose-800 text-white border border-white rounded-r-full hover:border-stone-500">SIGN UP</Link>
                    </div>
                    <div className="mx-10 m-5 bg-[#E55039] text-white rounded-[18px] pb-5">
                        <div className="flex justify-center text-lg">
                            Sign In form
                        </div>
                        <div className="flex mt-5">
                            <div className="flex justify-center w-1/3 text-lg">
                                Mail :
                            </div>
                            <input onChange={(e) => setEmail(e.target.value)} value={email} className="w-2/3 text-black text-sm bg-white rounded-lg ml-5 mr-5" style={{ paddingLeft: '8px', paddingRight: '8px' }}>

                            </input>
                        </div>
                        <div className="flex mt-5">
                            <div className="flex justify-center w-1/3 text-lg">
                                Password :
                            </div>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-2/3 text-black text-sm bg-white rounded-lg ml-5 mr-5"
                                style={{ paddingLeft: '8px', paddingRight: '8px' }}
                                type="password"
                            />

                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Button onClick={handleSignIn} style={{ textTransform: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center' }} className=" text-lg h-8 w-1/3 flex mb-4 col justify-center items-center text-white transition-colors duration-150 rounded-[15px] bg-[#E55039] border border-solid border-white hover:border-white" >
                            Sign In
                        </Button>
                    </div>
                </div>
        </main>
    );
}
