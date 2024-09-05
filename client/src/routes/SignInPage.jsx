import { SignIn } from "@clerk/clerk-react";
import React from "react";


const SignInPage = () => {
    return (
        <div className="h-[100%] flex items-center justify-center">
            <SignIn path="/sign-in" signUpUrl="/sign-up" forceRedirectUrl="/dashboard" />
        </div>
        
    )
}

export default SignInPage