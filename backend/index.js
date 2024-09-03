import express, { text } from "express";
import ImageKit from "imagekit";
import cors from "cors";
import mongoose from "mongoose";
import Chat from "./models/Chat.js";
import UserChat from "./models/UserChat.js";
import {ClerkExpressRequireAuth} from "@clerk/clerk-sdk-node";




const port = process.env.PORT || 3000;
const app = express();


app.use(cors(
        {
       origin:process.env.CLIENT_URL,
       credentials:true,
    }
    
))

app.use(express.json());

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("Connected to MongoDB");
    }
    catch(err){
        console.log(err);
    }
}





const imagekit = new ImageKit({
    urlEndpoint:"https://ik.imagekit.io/siser17",
    publicKey:"public_Oo8D9A7D+S4HioT1W2LU6TEqOos=",
    privateKey:"private_QxEuyoriXywOoRBn//HhTxh9fo0=",
});

app.get("/api/upload",(req,res)=>{
    
    var result = imagekit.getAuthenticationParameters();
    res.send(result);
})

app.get("/api/test", ClerkExpressRequireAuth(), (req,res)=>{
    const userId = req.auth.userId;
    console.log(userId);
});


// app.get("/api/test", ClerkExpressRequireAuth(), (req, res) => {
//     const userId = req.auth.userId;
//     console.log(userId);
//     res.send("Success!");
// })

app.get("/api/userchats", ClerkExpressRequireAuth(), async (req, res) => {
    const userId = req.auth.userId;
  
    try {
      const userChats = await UserChat.find({ userId});
  
      res.status(200).send(userChats[0].chats);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error fetching userchats!");
    }
  });


// app.get("/api/chat/:id", ClerkExpressRequireAuth(),async (req, res) => {
//     const userId = req.auth.userId;

//     try {
//         const chat = await Chat.findOne({_id: req.params.id, userId});
//         res.status(200).send(chat);
//     }
//     catch(err){
//         console.log(err);
//         res.status(500).send("Error fetching chat");
//     }
// })

app.get("/api/chats/:id", ClerkExpressRequireAuth(), async (req, res) => {
    const userId = req.auth.userId;
  
    try {
      const chat = await Chat.findOne({ _id: req.params.id, userId });
  
      res.status(200).send(chat);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error fetching chat!");
    }
  });



app.post("/api/chats", ClerkExpressRequireAuth(), async (req,res)=> {
    const userId = req.auth.userId;
    const {text} = req.body;
    
    try{
        //Create a new chat
        const newChat = new Chat({
            userId: userId, 
            history:[{role:"user", parts:[{text}]}]
        })

        const savedChat = await newChat.save();

        //check if the userchats exists
        const userChats = await UserChat.find({userId:userId});


        //if doesn't exists creata a new one and add the chat in the chats array
        if (!userChats.length){
            const newUserChats = new UserChat({
                userId:userId,
                chats:[
                    {
                        _id:savedChat.id,
                        title:text.substring(0.40),
                    }
                ]
            });
            await newUserChats.save();
        }else{
            // if exists, push the chats to the existing array
            await UserChat.updateOne({
                userId:userId},
                {
                    $push:{
                        chats:{
                            _id:savedChat._id,
                            title:text.substring(0,40),
                        },
                    },
                }
            );
        }
        res.status(201).send(newChat._id);
        
    }
    catch(err){
        console.log(err);
        res.status(500).send("Error in creating chat");
    }


});

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(401).send('Unauthenticated!')
  });

app.put("/api/chats/:id", ClerkExpressRequireAuth(), async(req, res)=> {
    const userId = req.auth.userId;

    const {question, answer, img} = req.body;

    const newItems = [
        ...(question?[{role:"user", parts:[{text:question}], ...(img && {img})}]:[]),
        {role:"model",parts:[{text:answer}],},
    ];

    try {
        const updatedChat = await Chat.updateOne({_id:req.params.id, userId}, {
            $push:{
                history:{
                    $each:newItems,
                },
            },
        });
        res.status(200).send(updatedChat);
    }
    catch(err){
        console.log(err);
        res.status(500).send("Error adding conversation");
        
    }
});

app.listen(port, ()=>{
    connect();
    // console.log({
    //     urlEndpoint:"https://ik.imagekit.io/siser17",
    // publicKey:"public_Oo8D9A7D+S4HioT1W2LU6TEqOos=",
    // privateKey:"private_QxEuyoriXywOoRBn//HhTxh9fo0=",
    // });
    console.log("Server is running on 3000");
})

