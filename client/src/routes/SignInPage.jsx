import { SignIn } from "@clerk/clerk-react";
import React from "react";


const SignInPage = () => {
    const handleClick = () => {

    }
    return (
        <div className="flex justify-between gap-[20px] flex-col-reverse items-center">
        <div className="h-auto w-auto flex items-center justify-center rounded-[20px] p-[20px] hover:text-white bg-[#0a0280] text-gray-400 ">
            <p>For Guest Login use</p>
            <p className="h-auto w-auto p-2 hover:text-white bg-[#0a0280] text-gray-400"> Email Address: jay.siserpratap@gmail.com</p>
            <p className="p-2 w-auto h-auto hover:text-white bg-[#0a0280] text-gray-400">Password : SISER123</p>
        </div>
        <div className="h-[100%] flex items-center justify-center">
            <SignIn path="/sign-in" signUpUrl="/sign-up" forceRedirectUrl="/dashboard" />
        </div>
        
        </div>
        
    )
}

export default SignInPage