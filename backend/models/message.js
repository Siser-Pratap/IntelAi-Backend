import mongoose from "mongoose";


const messageSchema = new mongoose.Schema({
    chatId: {type: mongoose.Schema.Types.ObjectId, ref: "Chat", required: true},
    role: {type: String, enum:["user", "assistant"], required: true},
    content: {type: String, required: true},
    timestamp: {type: Date, default: Date.now},
    image:{type: String},
}, {
    timestamps:true,
});

export default  mongoose.models.Message || mongoose.model("Message", messageSchema);