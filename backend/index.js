
import express from "express";
import cors from "cors";
import path from "path";
import url, { fileURLToPath } from "url";
import ImageKit from "imagekit";
import mongoose from "mongoose";
import chat from "./models/Chat.js";
import UserChats from "./models/userChats.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import connectDb from "./mongodb/connect.js";
import dotenv from "dotenv";




const port = process.env.PORT || 3000;
const app = express();

dotenv.config();







const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




const corsOptions = {
  // origin: process.env.CLIENT_URL,
  // credentials:true,
}

app.use(cors(corsOptions));



// const allowedOrigins = [
//   'https://chat-2i3hulb66-indiasis-projects.vercel.app',
//   'https://chat-now-git-main-indiasis-projects.vercel.app'
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   }
// }));




app.use(express.json());




const serverConnect = async() => {
    
    try{
      connectDb(process.env.MONGODB_URL);
      app.listen(port, ()=>{
        console.log(`Server is running on port ${port}`);
      })
    }
    catch(err){
      console.log(err);
    }
}

serverConnect();






const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});

app.get("/api/upload", (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});

app.get("/", async(req, res)=>{
  res.send("Hello from Image_Gen");
  // console.log(response.data[0].url);
});

app.post("/api/chats", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;
  const { text } = req.body;

  try {
    // CREATE A NEW CHAT
    const newChat = new chat({
      userId: userId,
      history: [{ role: "user", parts: [{ text }] }],
    });

    const savedChat = await newChat.save();

    // CHECK IF THE USERCHATS EXISTS
    const userChats = await UserChats.find({ userId: userId });

    // IF DOESN'T EXIST CREATE A NEW ONE AND ADD THE CHAT IN THE CHATS ARRAY
    if (!userChats.length) {
      const newUserChats = new UserChats({
        userId: userId,
        chats: [
          {
            _id: savedChat._id,
            title: text.substring(0, 40),
          },
        ],
      });

      await newUserChats.save();
    } else {
      // IF EXISTS, PUSH THE CHAT TO THE EXISTING ARRAY
      await UserChats.updateOne(
        { userId: userId },
        {
          $push: {
            chats: {
              _id: savedChat._id,
              title: text.substring(0, 40),
            },
          },
        }
      );

      res.status(201).send(newChat._id);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error creating chat!");
  }
});

app.get("/api/userchats", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;

  try {
    const userChats = await UserChats.find({ userId });

    res.status(200).send(userChats[0].chats);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching userchats!");
  }
});

app.get("/api/chats/:id", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;

  try {
    const Chat = await chat.findOne({ _id: req.params.id, userId });

    res.status(200).send(Chat);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching chat!");
  }
});


app.put("/api/chats/:id", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;
  const { question, answer, img } = req.body;

  // Ensure the question exists; first message must be from the user
  if (!question) {
    return res.status(400).send("First message must be from the user.");
  }

  // Create new items array starting with the user's input
  const newItems = [
    {
      role: "user",
      parts: [{ text: question }],
      ...(img && { img }),
    },
    {
      role: "model",
      parts: [{ text: answer }],
    },
  ];

  try {
    // Fetch the existing chat to validate the current state of history
    const Chat = await chat.findOne({ _id: req.params.id, userId });

    if (!Chat) {
      return res.status(404).send("Chat not found.");
    }

    // Check if the current history is empty or needs validation
    if (!Chat.history || Chat.history.length === 0) {
      // Ensure the history starts with a user role
      if (newItems[0].role !== "user") {
        return res
          .status(400)
          .send("Chat history must start with a user message.");
      }
    }

    // Update chat history with validated new items
    const updatedChat = await chat.updateOne(
      { _id: req.params.id, userId },
      {
        $push: {
          history: {
            $each: newItems,
          },
        },
      }
    );

    res.status(200).send(updatedChat);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding conversation!");
  }
});





app.use((err, req, res, next) => {
  console.error(err.stack);
  console.log(err.message);
  res.status(401).send("Unauthenticated!");
});




