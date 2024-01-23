'use client';

import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import supabase from '../connexionDatabase/connectToDatabase';
import { redirect } from 'react-router-dom';
const crypto = require('crypto');
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';


export default function SignupPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const[confirmPassword, setConfirmPassword] = useState('');
    const[username, setUsername] = useState('');

    const isPasswordValid = (password: string): boolean => {
        // Vérifier si le mot de passe a au moins 8 caractères, un chiffre et un caractère spécial
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        return regex.test(password);
    };

    const isEmailValid = (email: string): boolean => {
        // Expression régulière pour valider le format d'une adresse e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSignUp = async () => {
        console.log('Inscription en cours...');
        console.log('email :', email);
        console.log('password :', password);
        console.log('confirmPassword :', confirmPassword);
        console.log('username :', username);

        if (password !== confirmPassword) {
            console.error('Le mot de passe et la confirmation du mot de passe ne correspondent pas.');
            window.alert('Le mot de passe et la confirmation du mot de passe ne correspondent pas.');
            return;
        }
        if (!isPasswordValid(password)) {
            window.alert('Le mot de passe doit faire au moins 8 caractères, avoir au moins un chiffre et un caractère spécial.');
            return;
        } 
        if (!isEmailValid(email)) {
            window.alert("L'adresse e-mail n'a pas un format valide.");
            return;
        }

        let user = {
            email: email, 
            password: password,
        }

        console.log("User is : " + user.email + " " + user.password)

        const response = await fetch('/api/user', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });

        if(response.status === 201){
            console.log("User created")
            router.push('/signin')
        }
        else
        {
            console.log("User not created")
        }

        /* try {
            const dateActuelle = new Date();
            const time = dateActuelle.toISOString();
            console.log(`Heure actuelle: ${time}`);

            const { data, error } = await supabase.from('users').insert([{ email: email, username: username, hash:hashedPassword, updatedAt:time },]).select()
            if (error) {
                console.error('Erreur lors envoie des données :', error);
                return;
            }else{
                console.log('Inscription réussie !');
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
            }
        } catch (error) {
            console.error('Erreur inattendue :', error);
        } */
        
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
            //priority
        />        
        </div>
        <div className="w-3/4 rounded-[20px] bg-rose-800">
            <div className="flex m-5 justify-center">
                <Link href="/signin" className="w-1/4 h-1/2 text-center text-lg bg-rose-800 text-white border border-white rounded-l-full hover:border-stone-500">SIGN IN </Link>
                <Link href="/signup" className="w-1/4 h-1/2 text-center text-lg bg-[#E55039] text-white border border-white rounded-r-full hover:border-stone-500">SIGN UP</Link>
            </div>
            <div className="mx-10 m-5 bg-[#E55039] text-white rounded-[18px] pb-5">
                <div className="flex justify-center text-lg">
                    Sign Up form
                </div>
                <div className="flex mt-5">
                    <div className="flex justify-center w-1/3 text-lg">
                        Username :
                    </div>
                    <input  onChange={(e) => setUsername(e.target.value)} value={username} className="w-2/3 text-black text-sm bg-white rounded-lg ml-5 mr-5 text-center">
                        
                    </input>
                </div>
                <div className="flex mt-5">
                    <div className="flex justify-center w-1/3 text-lg">
                        Mail :
                    </div>
                    <input  onChange={(e) => setEmail(e.target.value)} value={email} className="w-2/3 text-black text-sm bg-white rounded-lg ml-5 mr-5 text-center">
                        
                    </input>
                </div>
                <div className="flex mt-5">
                    <div className="flex justify-center w-1/3 text-lg">
                        Password :
                    </div>
                    <input  onChange={(e) => setPassword(e.target.value)} value={password} className="w-2/3 text-black text-sm bg-white rounded-lg ml-5 mr-5 text-center" type="password">
                    </input>
                </div>
                <div className="flex mt-5">
                    <div className="flex justify-center w-1/3 text-lg pl-2">
                        Confirmation password:
                    </div>
                    <input  onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} className="w-2/3 text-black text-sm bg-white rounded-lg ml-5 mr-5 text-center" type="password">
                    </input>
                </div>
            </div>
            <div className="flex justify-center">
                <button
                onClick={handleSignUp}
                className="h-8 w-1/4 flex mb-2 justify-center text-white transition-colors duration-150 rounded-[20px] focus:shadow-outline shrink-0 bg-[#E55039] border border-solid border-white hover:border-transparent" type="button"
                >
                Sign Up
                </button>
            </div>
        </div>
    </main>
    );
}

