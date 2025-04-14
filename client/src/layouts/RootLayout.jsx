


import { Outlet } from "react-router-dom";
import "./rootLayout.css";



const RootLayout = () => {
  return (
  //   <div className="rootLayout">
  //         <header>
  //           {/* <Link to="/" className="logo">
  //             <img src="/logo.png" alt="" />
  //             <span>LAMA AI</span>
  //           </Link> */}
  //         </header>
  //         <main>
  //           <Outlet />
  //         </main>
  //       </div>
  // );
  <>
  <Outlet />
  </>
  )
};

export default RootLayout;