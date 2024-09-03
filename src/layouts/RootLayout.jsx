// import {Link, Outlet} from "react-router-dom";
// import { ClerkProvider, SignedIn, UserButton, SignedOut, SignInButton} from "@clerk/clerk-react";
// import { QueryClient } from "@tanstack/react-query";
// import {QueryClientProvider} from '@tanstack/react-query'
// // import "./rootLayout.css";

// const PUBLISHABLE_KEY = "pk_test_ZnVua3ktbG9ic3Rlci01OC5jbGVyay5hY2NvdW50cy5kZXYk"

// if (!PUBLISHABLE_KEY) {
//   throw new Error("Missing Publishable Key")
// }

// const queryClient = new QueryClient()

// const RootLayout  = () => {
//     return (
//         <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
//         <QueryClientProvider client={queryClient}>
//         <div className="pt-[16px] pr-[64px] h-[100vh] flex flex-col">
//             <header className="flex justify-between items-center">
//                 <Link to="/" className="flex items-center font-bold gap-[8px]">
//                 <img className="h-[36px] w-[36px]" src="/logo-white.png" alt="" />
//                 <span>Chat Now</span>
//                 </Link>
//                 <div className="">
//                     <SignedIn>
//                         <UserButton />
//                     </SignedIn>
//                 </div>
//             </header>
//             <main className="flex-1 overflow-hidden">
//                 <Outlet />
//             </main>
//         </div>
//         </QueryClientProvider>
//         </ClerkProvider>
//     );
// };

// export default RootLayout


import { Link, Outlet } from "react-router-dom";
// import "./rootLayout.css";
import { ClerkProvider, SignedIn, UserButton } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const queryClient = new QueryClient();

const RootLayout = () => {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <QueryClientProvider client={queryClient}>
        <div className="rootLayout">
          <header>
            <Link to="/" className="logo">
              <img src="/logo.png" alt="" />
              <span>LAMA AI</span>
            </Link>
            <div className="user">
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </header>
          <main>
            <Outlet />
          </main>
        </div>
      </QueryClientProvider>
    </ClerkProvider>
  );
};

export default RootLayout;