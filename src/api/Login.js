import React, { useEffect, useState } from "react";
import { validateEmail } from "lib/utils";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailInputError, setEmailInputError] = useState(false);
    const [passwordInputError, setPasswordInputError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    //vérifier en temps réel si les valeurs des champs (comme l'e-mail et le mot de passe) sont valides :
    useEffect(() => {
        validate();
    }, [email, password]);


    //Gérer la soumission d'un formulaire de connexion :
    async function handleSubmit(e) {
        e.preventDefault();
        const signInResponse = await signIn("credentials", {
            email,
            password,
            callbackUrl: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}`,
            redirect: false,
        });

        if (signInResponse?.ok) {
            // Toast success
            console.log("success");
        } else {
            // Toast failed
            setError("Failed! Check your input and try again.");
            console.log("Failed", signInResponse);
        }
    }

    function validate() {
        const emailIsValid = validateEmail(email);


        setEmailInputError(!emailIsValid);
        setPasswordInputError(password.length < 6);
    }

    return (
        <main className="flex min-h-screen flex-col items-center p-24 bg-zinc-300">
            <div>
                <Image
                    className=""
                    src="/cerber-logo-red.png"
                    alt="Cerber Logo"
                    width={200}
                    height={200}
                    priority
                />
            </div>
            <div className="w-3/4 rounded-[20px] bg-rose-800">
                <div className="flex m-5 justify-center">
                    <Link
                        href="/signup"
                        className="w-1/4 h-1/2 text-center text-lg bg-[#E55039] text-white border border-white rounded-l-full hover:border-stone-500"
                    >
                        SIGN IN{" "}
                    </Link>
                    <Link
                        href="/signup"
                        className="w-1/4 h-1/2 text-center text-lg bg-rose-800 text-white border border-white rounded-r-full hover:border-stone-500"
                    >
                        SIGN UP
                    </Link>
                </div>
                <div className="mx-10 m-5 bg-[#E55039] text-white rounded-[18px] pb-5">
                    <div className="flex justify-center text-lg">Sign In form</div>
                    <div className="flex mt-5">
                        <label className="flex justify-center w-1/3 text-lg">Mail :</label>
                        <input
                            type="text"
                            className={`w-2/3 text-black text-sm bg-white rounded-lg ml-5 mr-5 text-center ${
                                emailInputError ? "border-red-500" : ""
                            }`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex mt-5">
                        <label className="flex justify-center w-1/3 text-lg">
                            Password :
                        </label>
                        <input
                            type="password"
                            className={`w-2/3 text-black text-sm bg-white rounded-lg ml-5 mr-5 text-center ${
                                passwordInputError ? "border-red-500" : ""
                            }`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex justify-center">
                    <button
                        className="h-8 w-1/4 flex mb-2 justify-center text-white transition-colors duration-150 rounded-[20px] focus:shadow-outline shrink-0 bg-[#E55039] border border-solid border-white hover:border-transparent"
                        type="button"
                        onClick={handleSubmit}
                    >
                        Sign In
                    </button>
                </div>
                {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                )}
            </div>
        </main>
    );
}

export default LoginPage;
