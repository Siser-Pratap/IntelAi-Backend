import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./homepage.css";
import { TypeAnimation } from "react-type-animation";




const HomePage = () => {


    
    const [typingstatus,settypingstatus]=useState("Human1");

    const test = async () => {
    await fetch("http://localhost:3000/api/test",{
        credentials:"include",
    });
    };

    return (
        <div className="homepage flex items-center gap-[100px] h-full">
            <img src="/orbital.png" alt="" className="absolute bottom-0 left-0 orbital opacity-[0.05] z-[-1]" />
            <div className="left flex-1 flex flex-col items-center justify-center gap-[16px] text-center">
                    <h1 className="ChatNow  text-transparent bg-clip-text text-[128px] bg-gradient-to-r from-[#217bfe] to-[#e55571]">ChatNow</h1>
                    <h2>Supercharge your creativity and productivity</h2>
                    <h3 className="font-[400] max-w-[70%]">Experience seamless conversations with our advanced AI, designed to assist, entertain, and connect with you anytime, anywhere. Start chatting now!</h3>
                    <Link to="/dashboard" className="bg-[#217bfe] getstarted text-[14px] mt-[20px]  hover:bg-white hover:text-[#217bfe] text-white rounded-[20px] ">Get Started</Link>
                    <button onClick={test}>TEST BACKEND</button>
            </div>
            <div className="right flex-1 flex items-center justify-center h-full">
                <div className="imgContainer relative flex items-center justify-center bg-[#140e2d] rounded-[50px] w-[80%] h-1/2 ">
                    <div className="bgContainer w-full h-full overflow-hidden absolute top-0 left-0 rounded-[50px]">
                        <div className="bg opacity-[0.2] w-[200%] h-[100%] "></div>
                    </div>
                    <img src="/bot.png" alt="" className="bot w-full h-full object-contain"/>
                    <div className="chat absolute bottom-[-30px] right-[-50px] flex items-center gap-[10px] p-[20px] bg-[#2c2937] rounded-[10px]">
                        <img src={typingstatus==="human1"? "/human1.jpeg" :typingstatus==="human2"?"/human2.jpeg":"/bot.png"} alt="" className="w-[32px] h-[32px] rounded-[50%] object-cover" />
                            <TypeAnimation
                                sequence={[
                                    'Human1 : Hi there!',
                                    2000,
                                    ()=>{
                                        settypingstatus("bot");
                                    },
                                    'Bot: Hello! How can I assist you?',
                                    2000,
                                    ()=>{
                                        settypingstatus("human2");
                                    },
                                    'Human 2: Solve for x in 2x+3=11',
                                    2000,
                                    ()=>{
                                        settypingstatus("bot");
                                    },
                                    'Bot: Sure! x=4 ',
                                    2000,
                                    ()=>{
                                        settypingstatus("human1");
                                    },
                                ]}
                                wrapper="span"
                                repeat={Infinity}
                                cursor={true}
                                style={{fontSize:"1.5em"}}
                                omitDeletionAnimation={true}
                                />
                </div>
            </div>
            <div className="terms absolute bottom-[20px] left-[50%] flex flex-col items-center gap-[20px]">
                <img src="/logo-white.png" className="w-[32px] h-[32px] hover:opacity-[0.5] bg-transparent" alt="" />
                <div className="flex gap-[10px] text-[#888] text-[10px]">
                <Link to="/" className="hover:text-white">Terms Of service</Link>
                <span>|</span>
                <Link to="/" className="hover:text-white">Privacy policy</Link>
                </div>
            </div>
        </div>
    </div>
        
    )
}

export default HomePage