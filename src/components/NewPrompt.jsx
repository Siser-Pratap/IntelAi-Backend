import React from "react";
import "./newPrompt.css";
import { useRef, useEffect } from "react";
import Upload from "./Upload";

const NewPrompt = () => {

    
    const endRef = useRef(null);

    useEffect(()=>{
        endRef.current.scrollIntoView({behavior:"smooth"});
    }, []);



    return (
        <>
        TEST
        <div className="endChat" ref={endRef}></div>
            <form className="newForm">
                <Upload />
                <input type="file" id="file" multiple={false} hidden />
                <input type="text" placeholder="Ask anything..." />
                <button>
                    <img src="/arrow.png" alt="" />
                </button>

            </form>
        </>
    );
};

export default NewPrompt