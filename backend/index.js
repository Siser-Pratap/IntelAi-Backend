import express from "express";
import ImageKit from "imagekit";
import cors from "cors";




const port = process.env.PORT || 3000;
const app = express();


app.use(cors(
    //     {
    //     // origin :"http://localhost:5173/", 
    // }
))





const imagekit = new ImageKit({
    urlEndpoint:"https://ik.imagekit.io/siser17",
    publicKey:"public_Oo8D9A7D+S4HioT1W2LU6TEqOos=",
    privateKey:"private_QxEuyoriXywOoRBn//HhTxh9fo0=",
});

app.get("/api/upload",(req,res)=>{
    
    var result = imagekit.getAuthenticationParameters();
    res.send(result);
})

app.listen(port, ()=>{
    console.log("Server is running on 3000");
})

