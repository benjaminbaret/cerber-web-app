import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

function SignUp() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [passError, setPassError] = useState(false);

    useEffect(() => {
        validatePassword(formData.password, formData.confirmPassword);
    }, [formData.password, formData.confirmPassword]);

    function validatePassword(pass, confirmPass) {
        let isValid = confirmPass === pass;
        setPassError(!isValid);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        // Make call to backend to create user
        const res = await fetch("http://localhost:3000/api/user/create", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (res.ok) {
            const data = await res.json();
            // registration success
        } else {
            // registration failed
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center p-24 bg-zinc-300">
            {/* ... (rest of your code) */}
            <div className="flex mt-5">
                <div className="flex justify-center w-1/3 text-lg">
                    Confirmation password:
                </div>
                <input
                    type="password"
                    className="w-2/3 text-black text-sm bg-white rounded-lg ml-5 mr-5 text-center"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                        setFormData({ ...formData, confirmPassword: e.target.value })
                    }
                />
            </div>
            {passError && (
                <p className="text-red-500 text-sm mt-2">Passwords do not match</p>
            )}
            {/* ... (rest of your code) */}
        </main>
    );
}

export default SignUp;
