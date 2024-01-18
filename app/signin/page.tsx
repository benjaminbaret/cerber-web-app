'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function SigninPage() {

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
                    <input className="w-2/3 text-black text-sm bg-white rounded-lg ml-5 mr-5 text-center">
                        
                    </input>
                </div>
                <div className="flex mt-5">
                    <div className="flex justify-center w-1/3 text-lg">
                        Password :
                    </div>
                    <input className="w-2/3 text-black text-sm bg-white rounded-lg ml-5 mr-5 text-center" type="password">

                    </input>
                </div>
            </div>
            <div className="flex justify-center">
                <button
                className="h-8 w-1/4 flex mb-2 justify-center text-white transition-colors duration-150 rounded-[20px] focus:shadow-outline shrink-0 bg-[#E55039] border border-solid border-white hover:border-transparent" type="button"
                >
                Sign In
                </button>
            </div>
        </div>
    </main>
    );
}

