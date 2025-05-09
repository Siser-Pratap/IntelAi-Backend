import mongoose, { mongo } from "mongoose";

const newChatSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    messages: [
        {
            role: {
                type:String, 
                enum: ["user", "assistant"],
                required: true,
            },
            messages:{
                type: String,
                required: true,
            },
            images:{
                type: String,
            }
        }
    ]
});

const NewChat = mongoose.model("NewChat", newChatSchema);
export default NewChat;