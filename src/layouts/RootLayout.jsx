import {Link, Outlet} from "react-router-dom";
import { ClerkProvider, SignedIn, UserButton, SignedOut, SignInButton} from "@clerk/clerk-react";


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}



const RootLayout  = () => {
    return (
        <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <div className="pt-[16px] pr-[64px] h-[100vh] flex flex-col">
            <header className="flex justify-between items-center">
                <Link to="/" className="flex items-center font-bold gap-[8px]">
                <img className="h-[36px] w-[36px]" src="/logo-white.png" alt="" />
                <span>Chat Now</span>
                </Link>
                <div className="">
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </header>
            <main className="flex-1 overflow-hidden">
                <Outlet />
            </main>
        </div>
        </ClerkProvider>
    );
};

export default RootLayout