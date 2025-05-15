
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
  origin: "*", // Allow all origins
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow all HTTP methods
  allowedHeaders: "Content-Type,Authorization", // Allow specific headers
};

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

// app.post("/api/chats", async (req, res) => {
//   let userId;
//   const authHeader = req.headers.authorization;
//   console.log(authHeader, 'authHeader');
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).send("Authorization token missing or invalid.");
//   }
//   const token = authHeader.split(" ")[1];
//   console.log(token, 'token');
//   try {
//     console.log('try');
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     userId = decoded.id;
//     console.log(userId, 'userId');
//   } catch (err) {
//     console.log(err, 'error occurred');
//     return res.status(401).send("Invalid or expired token.");
//   }
//   const { text } = req.body;
//   console.log(text, 'text');

//   try {
//     const newChat = new chat({
//       userId: userId,
//       history: [{ role: "user", parts: [{ text }] }],
//     });
//     console.log(newChat, 'newChat');
//     const savedChat = await newChat.save();
//     const userChats = await UserChats.find({ userId: userId });
//     console.log(userChats, 'userChats');

//     if (!userChats.length) {
//       const newUserChats = new UserChats({
//         userId: userId,
//         chats: [
//           {
//             _id: savedChat._id,
//             title: text.substring(0, 40),
//           },
//         ],
//       });
//       await newUserChats.save();
//     } else {
//       await UserChats.updateOne(
//         { userId: userId },
//         {
//           $push: {
//             chats: {
//               _id: savedChat._id,
//               title: text.substring(0, 40),
//             },
//           },
//         }
//       );
//       res.status(201).send(newChat._id);
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Error creating chat!");
//   }
// });


// app.post("/api/chats", async(req, res)=>{
//   const userId = authMiddleware(req, res);
//   const {type} = req.body;
//   try {
//     const chat = new chat({
//       userId: userId,
//       type: type || "general",
//       messages: [],
//     });

//     await chat.save();
//     res.status(201).json({ message: "Chat created successfully", chatId: chat._id });
//   } catch (error) {
//     res.status(500).json({ message: "Error creating chat", error });
//   }
// });

// app.get("/api/:chatId", async (req, res) => {
//   const userId = authMiddleware(req, res);
//   const { chatId } = req.params;
//   try {
//     const chat = await chat.findOne({ _id: chatId, userId });
//     if (!chat) {
//       return res.status(404).json({ message: "Chat not found" });
//     }
//     res.status(200).json(chat);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching chat", error });
//   }
// });

// app.post("/api/:chatId/messages", async(req, res)=>{
//   const userId = authMiddleware(req, res);
//   const {chatId} = req.params;
//   const {content, image} = req.body;

//   try {
//     const chat = await chat.findOne({_id: chatId, userId});
//     if(!chat){
//       return res.status(404).json({message:"Chat not found"});
//     }
//     const message = {
//       role: "user",
//       content,
//       timestamp: new Date(),
//       image,
//     };
//     chat.messages.push(message);
//     await chat.save();
//     res.status(200).json({message:"Message sent successfully", chat});
//   } catch (error) {
//     res.status(500).json({message:"Error sending message", error});
//   }
// })


// app.get("/api/userchats", async (req, res) => {
//   let userId;
//   console.log(req.headers, 'req.headers');
//   const authHeader = req.headers.authorization;
//   const token = authHeader.split(" ")[1];
//   if (!token || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).send("Authorization token missing or invalid.");
//   }
//   console.log(token, 'token');
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     userId = decoded.id;
//     console.log(userId, 'userId');
//   } catch (err) {
//     console.log(err, 'error occurred');
//     return res.status(401).send("Invalid or expired token.");
//   }

//   try {
//     const userChats = await UserChats.find({ userId });
//      res.status(200).send(userChats[0]?.chats || []);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Error fetching userchats!");
//   }
// });

// app.get("/api/chats/:id", async (req, res) => {
//   let userId;
//   const authHeader = req.headers.authorization;
//   console.log(authHeader, 'authHeader');
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).send("Authorization token missing or invalid.");
//   }
//   const token = authHeader.split(" ")[1];
//   console.log(token, 'token');
//   try {
//     console.log('try');
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     userId = decoded.id;
//     console.log(userId, 'userId');
//   } catch (err) {
//     console.log(err, 'error occurred');
//     return res.status(401).send("Invalid or expired token.");
//   }

//   try {
//     const Chat = await chat.findOne({ _id: req.params.id, userId });

//     res.status(200).send(Chat);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Error fetching chat!");
//   }
// });


// app.put("/api/chats/:id",  async (req, res) => {
//   console.log(req);
//   let userId;
//   const authHeader = req.headers.authorization;
//   console.log(authHeader, 'authHeader');
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).send("Authorization token missing or invalid.");
//   }
//   const token = authHeader.split(" ")[1];
//   console.log(token, 'token');
//   try {
//     console.log('try');
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     userId = decoded.id;
//     console.log(userId, 'userId');
//   } catch (err) {
//     console.log(err, 'error occurred');
//     return res.status(401).send("Invalid or expired token.");
//   }
//   const { question, answer, img } = req.body;

//   // Ensure the question exists; first message must be from the user
//   if (!question) {
//     return res.status(400).send("First message must be from the user.");
//   }

//   // Create new items array starting with the user's input
//   const newItems = [
//     {
//       role: "user",
//       parts: [{ text: question }],
//       ...(img && { img }),
//     },
//     {
//       role: "model",
//       parts: [{ text: answer }],
//     },
//   ];

//   try {
//     // Fetch the existing chat to validate the current state of history
//     const Chat = await chat.findOne({ _id: req.params.id, userId });

//     if (!Chat) {
//       return res.status(404).send("Chat not found.");
//     }

//     // Check if the current history is empty or needs validation
//     if (!Chat.history || Chat.history.length === 0) {
//       // Ensure the history starts with a user role
//       if (newItems[0].role !== "user") {
//         return res
//           .status(400)
//           .send("Chat history must start with a user message.");
//       }
//     }

//     // Update chat history with validated new items
//     const updatedChat = await chat.updateOne(
//       { _id: req.params.id, userId },
//       {
//         $push: {
//           history: {
//             $each: newItems,
//           },
//         },
//       }
//     );

//     res.status(200).send(updatedChat);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error adding conversation!");
//   }
// });

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   console.log(err.message);
//   res.status(401).send("Unauthenticated!");
// });


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
  console.log(existingChat);
  return res.status(201).json({chats: existingChat.messages});
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
    console.log(chatId, message);
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
      user.chats.push({ chatId, message });
      await user.save();
      res.status(201).json({ message: "User chat added successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

app.delete("/api/chats", async (req, res) => {
  
  try {
    const result = await NewChat.deleteMany({ });
    res.status(200).json({ message: "All chats deleted successfully", deletedCount: result.deletedCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting chats", error });
  }
});


app.get("/api/userProfile/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const userProfile = await UserProfile.findOne({ email });
    if (!userProfile) {
      return res.status(404).json({ message: "User profile not found" });
    }
    res.status(200).json(userProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user profile", error });
  }
});

app.post("/api/userProfile", async (req, res) => {
  try {
    const { name, email, phone, location, bio, date } = req.body;
    const userProfile = new UserProfile({ name, email, phone, location, bio, date });
    await userProfile.save();
    res.status(201).json({ message: "User profile created", userProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user profile", error });
  }
});










