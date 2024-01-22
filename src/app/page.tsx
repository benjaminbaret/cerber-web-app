"use client";
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-darkPurple">
      <div className="">
        <img
          className=""
          src="images/cerber-logo-white.png"
          alt="Cerber Logo"
          width={403}
          height={403}
          //priority
        />
        <Link href="/signin"
          className="h-12 px-6 flex items-center justify-center transition-colors duration-150 rounded-lg focus:shadow-outline shrink-0 bg-gray-300 hover:bg-gray-500 border rounded-[40px] border-solid border-white" type="button"
          >
          Signin / Signup
        </Link>
      </div>
    </main>
  )
}
