// import { useAuth } from "@clerk/clerk-react";
// import React, { useEffect } from "react";
// import { Outlet, useNavigate } from "react-router-dom";
// import ChatList from "../components/ChatList";
// import "./dashboardlayout.css"





// const DashboardLayout = () => {
//     const { userId, isLoaded } = useAuth();

//     const navigate = useNavigate();
  
//     useEffect(() => {
//       if (isLoaded && !userId) {
//         navigate("/sign-in");
//       }
//     }, [isLoaded, userId, navigate]);
  
//     if (!isLoaded) return "Loading...";
  
//     return (
//       <div className="dashboardLayout">
//         <div className="menu"><ChatList /></div>
//         <div className="content">
//           <Outlet />
//         </div>
//       </div>
//     );
//   };

// export default DashboardLayout

import { Outlet, useNavigate } from "react-router-dom";
import "./dashboardlayout.css";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import ChatList from "../components/ChatList";

const DashboardLayout = () => {
  const { userId, isLoaded } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
  }, [isLoaded, userId, navigate]);

  if (!isLoaded) return "Loading...";

  return (
    <div className="dashboardLayout">
      <div className="menu"><ChatList/></div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;