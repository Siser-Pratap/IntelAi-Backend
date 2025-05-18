
import express from "express";
import cors from "cors";
import path from "path";
import url, { fileURLToPath } from "url";
import ImageKit from "imagekit";
import mongoose from "mongoose";
// import chat from "./models/Chat.js";
import chat from "./models/Chat.js";
import UserChats from "./models/userChats.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import connectDb from "./mongodb/connect.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import authMiddleware from "./middleware.js";
import NewChat from "./models/newChat.js";
import { stat } from "fs";
import newUserChats from "./models/newUserChat.js";
import UserProfile from "./models/userProfile.js";


dotenv.config();

const port = process.env.PORT || 8000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const corsOptions = {
//   // origin: process.env.CLIENT_URL,
//   // credentials:true,
// }

const corsOptions = {
  origin: "*", 
  credentials: true, 
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", 
  allowedHeaders: "Content-Type,Authorization", 
};



app.use(cors(corsOptions));

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

app.post("/api/login", async(req, res)=>{
  const {email, password} = req.body;
  console.log({email, password});
  try {
    const user = await User.findOne({email});
    console.log(user);
    if(!user){
      return res.status(404).json({message:"User not found "});
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(isPasswordValid);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    
    const token = jwt.sign({ id: user._id, email: user.email },process.env.JWT_SECRET,{ expiresIn: "24h" });
    console.log(token);
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      message: "Signup successful",
      user: {
        id: savedUser._id,
        email: savedUser.email,
        name: savedUser.name,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/", async(req, res)=>{
  res.send("Hello from Image_Gen");
  // console.log(response.data[0].url);
});


app.post("/api/chats/", authMiddleware, async(req, res)=>{
  console.log("hit2");
  const {role, message, image, date} = req.body;
  console.log(req, req.body);
  const userId = req.userId;
  const newChat = new NewChat({
    _id: new mongoose.Types.ObjectId(),
    userId: userId,
    messages: [
      {
        role: role,
        messages: message,
        images: image ? image : "",
        date: date,
      },
    ],
  });
  console.log({role, message, image, newChat, userId, "welcome":"welcome"});
  await newChat.save();
  res.json({status: 201, message: "New Chat created", chatId: newChat._id});
})


app.get("/api/chats/:id",authMiddleware, async(req, res)=>{
  const userId = req.userId;
  const {id} = req.params;
  console.log(id);
  const existingChat = await NewChat.findById(id);
  const messages = existingChat?.messages || "";
  console.log(existingChat);
  return res.status(201).json({chats: messages});
})

app.post("/api/chats/:id", authMiddleware, async(req, res)=>{
  const {id} = req.params;
  const {role, message, image, date} = req.body;
  console.log(id, message, image);
  const userId = req.userId;
  if(!userId){
    res.json({status:500, message:"Please Login First"});
  }

  const existingChat = await NewChat.findById(id);
  console.log(existingChat);
  if(existingChat && id){
    existingChat.messages.push({
      role:role,
      messages:message,
      images:image? image : "",
      date: date
    });
    await existingChat.save(); // Save the updated chat to the database
    res.json({status: 201, message: "Existing Chat updated"});
  } else {
    res.status(404).json({status: 404, message: "Chat not found"});
  }
});

app.post("/api/userChats", authMiddleware, async (req, res) => {
  const userId = req.userId;
  console.log(userId);

  try {
    const {chatId, message, date} = req.body;
    console.log(chatId, message, date,  'chatId, message, date');
    if (!chatId || !message) {
      return res.status(400).json({ message: "chatId and message are required" });
    }
    const user = await newUserChats.findOne({ userId: userId });

    if (!user) {
      const newUserChat = new newUserChats({
        _id: new mongoose.Types.ObjectId,
        userId: userId,
        chats:[
          {
            chatId: chatId,
            message: message, 
            date: date
          }
        ]
      });
      await newUserChat.save();
      res.json({status: 201, message: "new User Chat added"});
    }
    else{
      user.chats.push({ chatId, message, date});
      await user.save();
      res.status(201).json({ message: "User chat added successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

app.get('/api/userChats', authMiddleware, async(req, res)=>{
 const userId = req.userId;
 try {
  const userChats = await newUserChats.findOne({userId});
  let messageCount=0;
  if (userChats && userChats.chats && userChats.chats.length > 0) {
    for (let chat of userChats.chats) {
      const chatDoc = await NewChat.findById(chat.chatId);
      chat.messageCount = chatDoc ? (chatDoc.messages ? chatDoc.messages.length : 0) : 0;
      console.log(chat.messageCount);
      messageCount=chat.messageCount+messageCount;
    }
  }
  console.log(messageCount);
  res.status(200).json({chats:userChats.chats, messageCount:messageCount});
 } catch (error) {
  console.error(error);
    res.status(500).json({ message: "Error updating user profile", error }); 
 } 
})

app.delete("/api/chats", async (req, res) => {
  
  try {
    const result = await NewChat.deleteMany({ });
    res.status(200).json({ message: "All chats deleted successfully", deletedCount: result.deletedCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting chats", error });
  }
});


app.get("/api/userProfile",authMiddleware, async (req, res) => {
  console.log(req.headers);
  const userId= req.userId;
  try {
    const userProfile = await UserProfile.findOne({ userId });
    res.status(200).json(userProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user profile", error });
  }
});

app.post("/api/userProfile",authMiddleware,  async (req, res) => {
  
  const userId = req.userId;
  console.log(userId, 'userId');
  try {
    const { name, email, phone, location, bio, avatar, date} = req.body;
    const userProfile = new UserProfile({ name, email, phone, location, bio, date, userId, date, avatar });
    await userProfile.save();
    res.status(201).json({ message: "User profile created", userProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user profile", error });
  }
});

app.put("/api/userProfile", authMiddleware, async (req, res) => {
  const userId = req.userId;
  try {
    const { name, email, phone, location, bio, avatar, date } = req.body;
    const updatedProfile = await UserProfile.findOneAndUpdate(
      { userId },
      { name, email, phone, location, bio, avatar, date },
      { new: true }
    );
    const user = await User.findById({userId});
    if(req.body.email!==user.email){
      user.email = req.body.email;
      await user.save();
    }
    if (!updatedProfile) {
      return res.status(404).json({ message: "User profile not found" });
    }
    res.status(201).json({ message: "User profile updated", userProfile: updatedProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user profile", error });
  }
});

app.post('/api/forgot-password', async(req, res)=>{
  console.log('clicked');
  const {email, password}=req.body;
  console.log(email, password);
  try {
    const user = await User.findOne({email});
    if(!user){
      return res.status(404).json({message:`No user registered with ${email}`});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password=hashedPassword;
    await user.save();
    return res.status(200).json({message:"Password Updated SuccessFully"});
  } catch (error) {
    
  }
})








