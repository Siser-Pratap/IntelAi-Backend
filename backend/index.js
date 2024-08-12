import express from "express";
import ImageKit from "imagekit";


const cors = require("cors");


const port = process.env.PORT || 3000;
const app = express();


app.use(cors(
        {
        origin : process.env.CLIENT_URL 
    }
))


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });


const imagekit = new ImageKit({
    urlEndpoint: process.env.VITE_IMAGE_KIT_ENDPOINT,
    publicKey: process.env.VITE_IMAGE_KIT_PUBLIC_KEY,
    privateKey: process.env.VITE_IMAGE_KIT_PRIVATE_KEY,
});

app.get("/api/upload",(req,res)=>{
    const result = imagekit.getAuthenticationParameters();
    res.send(result);
})

app.listen(port, ()=>{
    console.log("Server is running on 3000");
})

