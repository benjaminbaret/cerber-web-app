'use client';

import { useState } from 'react';
import Link from 'next/link';
const crypto = require('crypto');
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SigninPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async (values: { email: any; password: any; }) => {
        
        const signInData = await signIn('Credentials', {
            email: values.email,
            password: values.password,
        });

        if(signInData?.error){
            console.log(signInData.error);
        }
        else{
            console.log("pushing to dashboard");
            router.push('/dashboard');
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
                <input onChange={(e) => setEmail(e.target.value)} value={email}className="w-2/3 text-black text-sm bg-white rounded-lg ml-5 mr-5 text-center">
                    
                </input>
            </div>
            <div className="flex mt-5">
                <div className="flex justify-center w-1/3 text-lg">
                    Password :
                </div>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-2/3 text-black text-sm bg-white rounded-lg ml-5 mr-5 text-center"
                    type="password"
                />

            </div>
        </div>
        <button
            className="h-8 w-1/4 flex mb-2 justify-center text-white transition-colors duration-150 rounded-[20px] focus:shadow-outline shrink-0 bg-[#E55039] border border-solid border-white hover:border-transparent"
            type="button"
            onClick={handleSignIn}
        >
            Sign In
        </button>
    </div>
    </main>
    );
}
