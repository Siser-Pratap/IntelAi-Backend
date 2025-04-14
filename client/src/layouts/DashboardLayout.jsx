

import { Outlet, useNavigate } from "react-router-dom";
import "./dashboardlayout.css";
import { useEffect } from "react";
import ChatList from "../components/ChatList";
import {jwtDecode} from 'jwt-decode';

const DashboardLayout = () => {
  let isLoaded;
  let userId;
  const token = localStorage.getItem('token');
    if(token){
      isLoaded=false; 
      try {
        const decodedToken = jwtDecode(token);
        userId = decodedToken.id;
        console.log('Decoded Token', decodedToken);
      } catch (error) {
        console.error("Invalid Token:", error);
      }
    };
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
  }, [isLoaded, userId, navigate]);

  // if (!isLoaded) return "Loading...";

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