

import "./chatPage.css";
import NewPrompt from "../components/NewPrompt";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import Markdown from "react-markdown";
import { IKImage } from "imagekitio-react";



const ChatPage = () => {

  console.log(import.meta.env.VITE_PUBLIC_BACKEND_URL);

  
  const path = useLocation().pathname;
  const chatId = path.split("/").pop();

  const { isPending, error, data } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_PUBLIC_BACKEND_URL}/api/chats/${chatId}`,{method:'GET', headers:{
        'Content-Type':'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },}).then((res) => res.json()),
  });

  console.log(data);

  return (
    <div className="chatPage">
      <div className="wrapper">
        <div className="chat" >
          {isPending
            ? "Loading..."
            : error
            ? "Something went wrong!"
            : data?.history?.map((message, i) => (
                <div key={message._id || i}>
                  {message.img && (
                    <div className={message.role === "user" ? "message img" : "message "}>
                    <IKImage
                      urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                      path={message.img}
                      height="300"
                      width="400"
                      transformation={[{ height: 300, width: 400 }]}
                      loading="lazy"
                      lqip={{ active: true, quality: 20 }}
                    />
                    </div>
                  )}
                  
                  <div
                    className={
                      message.role === "user" ? "message user " : "message "
                    }
                    key={i}
                  >
                    <Markdown>{message.parts[0].text}</Markdown>
                  </div>
                </div>
              ))}

          {data && <NewPrompt data={data}/>}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;