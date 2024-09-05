// import express from "express";
// import cors from "cors";
// import path from "path";
// import url, { fileURLToPath } from "url";
// import ImageKit from "imagekit";
// import mongoose from "mongoose";
// import chat from "./models/chat";
// import userChats from "./models/userChats";

// import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

// const port = process.env.PORT || 3000;
// const app = express();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//     credentials: true,
//   })
// );

// app.use(express.json());

// const connect = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO);
//     console.log("Connected to MongoDB");
//   } catch (err) {
//     console.log(err);
//   }
// };

// const imagekit = new ImageKit({
//   urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
//   publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
//   privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
// });

// app.get("/api/upload", (req, res) => {
//   const result = imagekit.getAuthenticationParameters();
//   res.send(result);
// });

// app.post("/api/chats", ClerkExpressRequireAuth(), async (req, res) => {
//   const userId = req.auth.userId;
//   const { text } = req.body;

//   try {
//     // CREATE A NEW CHAT
//     const newChat = new Chat({
//       userId: userId,
//       history: [{ role: "user", parts: [{ text }] }],
//     });

//     const savedChat = await newChat.save();

//     // CHECK IF THE USERCHATS EXISTS
//     const userChats = await UserChats.find({ userId: userId });

//     // IF DOESN'T EXIST CREATE A NEW ONE AND ADD THE CHAT IN THE CHATS ARRAY
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
//       // IF EXISTS, PUSH THE CHAT TO THE EXISTING ARRAY
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

// app.get("/api/userchats", ClerkExpressRequireAuth(), async (req, res) => {
//   const userId = req.auth.userId;

//   try {
//     const userChats = await UserChats.find({ userId });

//     res.status(200).send(userChats[0].chats);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Error fetching userchats!");
//   }
// });

// app.get("/api/chats/:id", ClerkExpressRequireAuth(), async (req, res) => {
//   const userId = req.auth.userId;

//   try {
//     const chat = await Chat.findOne({ _id: req.params.id, userId });

//     res.status(200).send(chat);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Error fetching chat!");
//   }
// });

// app.put("/api/chats/:id", ClerkExpressRequireAuth(), async (req, res) => {
//   const userId = req.auth.userId;

//   const { question, answer, img } = req.body;

//   const newItems = [
//     ...(question
//       ? [{ role: "user", parts: [{ text: question }], ...(img && { img }) }]
//       : []),
//     { role: "model", parts: [{ text: answer }] },
//   ];

//   try {
//     const updatedChat = await Chat.updateOne(
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
//     console.log(err);
//     res.status(500).send("Error adding conversation!");
//   }
// });

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(401).send("Unauthenticated!");
// });

// // PRODUCTION
// app.use(express.static(path.join(__dirname, "../client/dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
// });

// app.listen(port, () => {
//   connect();
//   console.log("Server running on 3000");
// });


import express from "express";
import cors from "cors";
import path from "path";
import url, { fileURLToPath } from "url";
import ImageKit from "imagekit";
import mongoose from "mongoose";
import Chat from "./models/chat.js";
import UserChats from "./models/userChats.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import connectDb from "./mongodb/connect.js";
// import { useClerk } from "@clerk/clerk-react";




const port = process.env.PORT || 3000;
const app = express();

// if (!process.env.CLERK_PUBLISHABLE_KEY || !process.env.CLERK_SECRET_KEY) {
//   console.error("Missing Clerk API keys in environment variables.");
//   process.exit(1);
// }

// // Initialize Clerk with the secret key, used for server-side operations
// const clerk = useClerk({
//   secretKey: process.env.CLERK_SECRET_KEY,
// });






const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//     credentials: true,
//   })
// );



const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials:true,
}

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

app.post("/api/chats", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;
  const { text } = req.body;

  try {
    // CREATE A NEW CHAT
    const newChat = new Chat({
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
    const chat = await Chat.findOne({ _id: req.params.id, userId });

    res.status(200).send(chat);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching chat!");
  }
});

// app.put("/api/chats/:id", ClerkExpressRequireAuth(), async (req, res) => {
//   const userId = req.auth.userId;

//   const { question, answer, img } = req.body;

//   if(!question){
//     return res.status(400).send("First message must be from the user");
//   }

//   const newItems = [
//     (question
//       ? [{ role: "user", parts: [{ text: question }], ...(img && { img }) }]
//       : []),
//     { role: "model", parts: [{ text: answer }] },
//   ];

//   try {
//     const updatedChat = await Chat.updateOne(
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
//     console.log(err);
//     res.status(500).send("Error adding conversation!");
//   }
// });

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
    const chat = await Chat.findOne({ _id: req.params.id, userId });

    if (!chat) {
      return res.status(404).send("Chat not found.");
    }

    // Check if the current history is empty or needs validation
    if (!chat.history || chat.history.length === 0) {
      // Ensure the history starts with a user role
      if (newItems[0].role !== "user") {
        return res
          .status(400)
          .send("Chat history must start with a user message.");
      }
    }

    // Update chat history with validated new items
    const updatedChat = await Chat.updateOne(
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
  res.status(401).send("Unauthenticated!");
});

// PRODUCTION
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

