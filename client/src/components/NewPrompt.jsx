


import { useEffect, useRef, useState } from "react";
import "./newPrompt.css";
import Upload from "./Upload";
import { IKImage } from "imagekitio-react";
import model from "../lib/gemini.js";
import Markdown from "react-markdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const NewPrompt = ({ data }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });

 

  const chat = model.startChat({
    history: 
      // Flatten the array and ensure correct format
      data?.history
        .filter(({ role }) => role === 'user' || role === 'model') // Filter valid roles
        .map(({ role, parts }) => ({
          role,
          parts: [{ text: parts[0]?.text || "" }], // Handle missing parts gracefully
        })),
    generationConfig: {
      // Add your desired generation configuration here
    },
  });

  const endRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [data, question, answer, img.dbData]);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/chats/${data._id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question.length ? question : undefined,
          answer,
          img: img.dbData?.filePath || undefined,
        }),
      });
      return await res.json();
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: ["chat", data._id] })
        .then(() => {
          formRef.current.reset();
          setQuestion("");
          setAnswer("");
          setImg({
            isLoading: false,
            error: "",
            dbData: {},
            aiData: {},
          });
        });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const add = async (text, isInitial) => {
    if (!isInitial) setQuestion(text);

    try {
      const result = await chat.sendMessageStream(
        Object.entries(img.aiData).length ? [img.aiData, text] : [text]
      );
      let accumulatedText = "";
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        console.log(chunkText);
        accumulatedText += chunkText;
        setAnswer(accumulatedText);
      }

      mutation.mutate();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = e.target.text.value;
    if (!text) return;

    add(text, false);
  };

  // IN PRODUCTION WE DON'T NEED IT
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      if (data?.history?.length === 1) {
        add(data.history[0].parts[0].text, true);
      }
    }
    hasRun.current = true;
  }, []);

  return (
    <>
      {/* ADD NEW CHAT */}
      
      {img.isLoading && <div className="">Loading...</div>}
      {img.dbData?.filePath && (
        
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
          path={img.dbData?.filePath}
          width="380"
          transformation={[{ width: 380 }]}
        />
        
      )}
      {question && <div className="message user">{question}</div>}
      {answer && (
        <div className="message">
          <Markdown>{answer}</Markdown>
        </div>
      )}
      
      <div className="endChat" ref={endRef}></div>
      <form className="flex justify-center items-end m-1 w-full h-full  mb-[10px]" onSubmit={handleSubmit} ref={formRef}>
        <div className="m-1 mb-[35px]">
        <Upload className="" setImg={setImg} />
        <input id="file" className="" type="file" multiple={false} hidden />
        </div>
        <div className="flex  justify-between items-center gap-[10px]">
        <input className="p-[20px] text-[#ececec] bg-[#2c2937] mb-[20px] rounded-[20px] border-none outline-none" type="text" name="text" placeholder="Ask anything..." />
        <button className="bg-[#2c2937] rounded-[20px] p-[10px] mb-[20px]">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18" />
            </svg>
        </button>
        </div>
      </form>
    </>
  );
};

export default NewPrompt;