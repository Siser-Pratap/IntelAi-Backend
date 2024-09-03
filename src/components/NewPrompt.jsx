import React, { useState } from "react";
import "./newPrompt.css";
import { useRef, useEffect } from "react";
import Upload from "./Upload";
import { IKImage } from "imagekitio-react";
import model from "../lib/gemini";
import Markdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

const NewPrompt = (data) => {


    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    

    const [img, setImg] = useState(
        {
            isLoading: false,
            error:"",
            dbData:{},
            aiData:{}
        }
    )

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const text = e.target.text.value;
        
        if (!text) return;
    
        // add(text, false);

        
        
        
      };

    const endRef = useRef(null);

    useEffect(()=>{
        endRef.current.scrollIntoView({behavior:"smooth"});
    }, [question, answer, img.dbData]);


    const queryClient = useQueryClient();

    // const navigate = useNavigate();

    const mutation = useMutation({
    mutationFn:() => {
       return fetch(`${import.meta.env.VITE_API_URL}api/chats/${data._id}`, {
        method: 'PUT',
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question:question.length ? question:undefined,
            answer,
            img: img.dbData?.filePath || undefined,
        }),
      }).then((res)=>resjson());
      
    },
    onSuccess:() => {
      queryClient.invalidateQueries({queryKey: ["chat", data._id]}).then(()=>{
        setQuestion("");
        setAnswer("");
        setImg({
            isLoading:false,
            error:"",
            dbData:{},
            aiData:{},
        });
      });
    },
    onError: (err) => {
        console.log(err);
    },
  });

    const add = async(text) => {

    setQuestion(text)

    try{
    const result = await chat.sendMessageStream(
        Object.entries(img.aiData).length?[img.aiData, text]:[text]
    );

    let accumulatedText="";
    for await (const chunk of result.stream){
        const chunkText = chunk.text();
        console.log(chunkText);
        accumulatedText+=chunkText;
        setAnswer(accumulatedText);
    }
    mutation.mutate();
    }
    catch(err){
        console.log(err);
    }
    }

    const chat = model.startChat({
        history:[
        {
            role:"user",
            parts:[{text:"Hello, I have 2 dogs"}],
        },
        {
            role:"model",
            parts:[{text:"Great to meet you. What would you like to know?"}],
        },
    ],
        generationConfig:{
            // maxOutputTokens:100,
        }
    });



    return (
        <>
        {img.isLoading && <div className="">Loading...</div>}
        {img.dbData?.filePath && (
            <IKImage 
            urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
            path={img.dbData?.filePath}
            width={220}
            transformation={[{width:"380"}]}/>
        )}
        {question && <div className="message user">{question}</div>}
        {answer && <div className="message"><Markdown>{answer}</Markdown></div>}
        
        <div className="endChat" ref={endRef}></div>
            <form className="newForm" onSubmit={handleSubmit}>
                <Upload setImg={setImg} />
                <input type="file" id="file" multiple={false} hidden />
                <input type="text" name="text" placeholder="Ask anything..." />
                <button>
                    <img src="/arrow.png" alt="" />
                </button>

            </form>
        </>
    );
};

export default NewPrompt