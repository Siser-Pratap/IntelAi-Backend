import express from "express";
import ImageKit from "imagekit";
import cors from "cors";
import mongoose from "mongoose";




const port = process.env.PORT || 3000;
const app = express();


app.use(cors(
    //     {
    //    origin:process.env.CLIENT_URL
    // }
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
    urlEndpoint:process.env.IMAGE_KIT_ENDPOINT,
    publicKey:"public_Oo8D9A7D+S4HioT1W2LU6TEqOos=",
    privateKey:process.env.IMAGE_KIT_PRIVATE_KEY,
});

app.get("/api/upload",(req,res)=>{
    
    var result = imagekit.getAuthenticationParameters();
    res.send(result);
})

app.post("/api/chats", (req,res)=> {
    const text = req.body;
    console.log(text);
});

app.listen(port, ()=>{
    connect();
    console.log("Server is running on 3000");
})

