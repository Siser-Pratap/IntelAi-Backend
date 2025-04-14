import { useMutation, useQueryClient } from "@tanstack/react-query";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const DashboardPage = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (text) => {
      console.log('token', localStorage.getItem('token'));
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ text }),
      }).then((res) => {
        if(!res.ok){
          throw new Error('Failed to create chat');
        }
        return res.json()
    });
  },
    onSuccess: (id) => {
     queryClient.invalidateQueries({ queryKey: ["userChats"] });
      navigate(`/dashboard/chats/${id}`);
    },
  });

  useEffect(()=>{
    console.log(localStorage.getItem('token'), 'token');
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;

    mutation.mutate(text);
  };
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
           </div>
         </div>
       </div>
       <div className="">
         <form className="flex justify-between items-center w-full h-full gap-[20px] mb-[10px]"onSubmit={handleSubmit}>
           <input className=" p-[20px] text-[#ececec] bg-[#2c2937] mb-[20px] rounded-[20px] border-none outline-none" type="text" name="text" placeholder="Ask me anything..." />
           <button className="bg-[#2c2937] rounded-[20px] p-[10px] mb-[20px]">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18" />
            </svg>

           </button>
         </form>
       </div>
     </div>
  );
};

export default DashboardPage;