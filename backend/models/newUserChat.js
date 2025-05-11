import mongoose from "mongoose";

const newUserChatsSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {
        type:String,
        required:true,
    },
    chats: [
        {
            chatId: mongoose.Schema.Types.ObjectId,
            message: String,
            date: Date,
        }
    ]
});

const newUserChats = mongoose.model("newUserChats", newUserChatsSchema);
export default newUserChats;