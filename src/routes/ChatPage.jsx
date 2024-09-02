
import "./chatPage.css";
import NewPrompt from "../components/NewPrompt";
import { useLocation } from "react-router-dom";
import Markdown from "react-markdown";
import { useQuery } from "@tanstack/react-query";



const ChatPage = () => {

  //   const path=useLocation().pathname;
  //   const chatId = path.split("/").pop(); 

  // const { isPending, error, data } = useQuery({
  //   queryKey: ["chat", chatId],
  //   queryFn: () =>
  //     fetch(`${import.meta.env.VITE_API_URL}api/chat/${chatId}`, {
  //       credentials: "include",
  //     }).then((res) => res.json()),
  // });
    
  const path = useLocation().pathname;
  const chatId = path.split("/").pop();

  const { isPending, error, data } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}api/chats/${chatId}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });



  return (
    <div className="chatPage">
      <div className="wrapper">
        <div className="chat">
          {/* {isPending? "Loading...":error? "Something Went wrong":data?.history?.map(
            (message, i)=> {
              <div className="message user">
                <Markdown>{message.parts[0].text}</Markdown>
              </div>
            }
          )} */}



          {/* <NewPrompt /> */}
          {/* {isPending
            ? "Loading..."
            : error
            ? "Something went wrong!"
            : data?.history?.map((message, i) => (
                <> */}
                  {/* {message.img && (
                    <IKImage
                      urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                      path={message.img}
                      height="300"
                      width="400"
                      transformation={[{ height: 300, width: 400 }]}
                      loading="lazy"
                      lqip={{ active: true, quality: 20 }}
                    />
                  )}
                  <div
                    className={
                      message.role === "user" ? "message user" : "message"
                    }
                    key={i}
                  >
                    <Markdown>{message.parts[0].text}</Markdown>
                  </div>
                </>
              ))}

          {data && <NewPrompt data={data}/>} */}
            {isPending?"Loading...":error?"Something went wrong!":data?.history.map(
              (message, i)=>{
                <div className="message user" key={i}>
                  <Markdown>{message.parts[0].text}</Markdown>
                </div>
              }
            )}



          
        </div>
      </div>
    </div>
  );
};

export default ChatPage;