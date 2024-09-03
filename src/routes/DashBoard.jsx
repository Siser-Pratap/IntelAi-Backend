import React from "react";
import "./dashboard.css";
import { useAuth } from "@clerk/clerk-react";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";


const DashBoard = () => {

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (text) => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}api/chats`, {
        method: 'POST',
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      return await res.json();
    },
    onSuccess:(id) => {
      queryClient.invalidateQueries({queryKey: ["userChats"]})
      navigate(`/dashboard/chats/${id}`);

    },
  })




  const handleclick = async() => {
    await fetch("http://localhost:3000/api/test", {
      credentials:"include",
    });
};

    const handlesubmit = async(e) => {
      e.preventDefault();
      const text= e.target.text.value;
      if (!text) return;

      mutation.mutate(text);

      

    }
    


    return (
        <div className="dashboardPage">
        <div className="texts">
          <div className="logo">
            <img src="/logo.png" alt="" />
            <h1>LAMA AI</h1>
          </div>
          <div className="options">
            <div className="option">
              <img src="/chat.png" alt="" />
              <span>Create a New Chat</span>
            </div>
            <div className="option">
              <img src="/image.png" alt="" />
              <span>Analyze Images</span>
            </div>
            <div className="option">
              <img src="/code.png" alt="" />
              <span>Help me with my Code</span>
              <button onClick={handleclick}>help me</button>
            </div>
          </div>
        </div>
        <div className="formContainer" onSubmit={handlesubmit}>
          <form>
            <input type="text" name="text" placeholder="Ask me anything..." />
            <button>
              <img src="/arrow.png" alt="" />
            </button>
          </form>
        </div>
      </div>
        

        
    );
};

export default DashBoard