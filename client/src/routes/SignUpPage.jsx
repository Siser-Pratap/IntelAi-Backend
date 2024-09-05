import { SignUp } from "@clerk/clerk-react";
import React from "react";
import DashBoard from "./DashBoard";


const SignUpPage = () => {
    return (
        <div className="h-full flex items-center justify-center">
            <SignUp path="/sign-up" signInUrl="/sign-in" forceRedirectUrl="/dashboard" />
        </div>
    )
}

export default SignUpPage