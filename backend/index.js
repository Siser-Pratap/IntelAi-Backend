import express from "express";
import ImageKit from "imagekit";
import cors from "cors";
import mongoose from "mongoose";
import { MongoClient, ServerApiVersion } from "mongodb";




const port = process.env.PORT || 3000;
const app = express();


app.use(cors(
    //     {
    //    origin:process.env.CLIENT_URL
    // }
))

app.use(express.json());


const uri = "mongodb+srv://jaysiserpratap:jaysiserpratap@chatnow.fr2vg.mongodb.net/?retryWrites=true&w=majority&appName=ChatNow";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    
    await client.connect({
        
    });
    
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
    await client.close();
    
  }
}
run().catch(console.dir);







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
    setTimeout(() => {
        run();
    }, 5);
    
    console.log("Server is running on 3000");
})

