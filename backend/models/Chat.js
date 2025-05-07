

// import mongoose from "mongoose";

// const chatSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: String,
//       required: true,
//     },
//     history: [
//       {
//         role: {
//           type: String,
//           enum: ["user", "model"],
//           required: true,
//         },
//         parts: [
//           {
//             text: {
//               type: String,
//               required: true,
//             },
//           },
//         ],
//         img: {
//           type: String,
//           required: false,
//         },
//       },
//     ],
//   },
//   { timestamps: true }
// );

// export default mongoose.models.chat || mongoose.model("chat", chatSchema);

import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  type: {type:String, enum:["general", "image", "code"], default:"general"},
  messages:[
    {
      role: {type: String, enum:["user", "assistant"], required: true},
      content: {type: String, required: true},
      timestamp: {type: Date, default: Date.now},
      image: {type: String},
    },
  ],
}, {
  timestamps:true,
});

export default mongoose.models.chat || mongoose.model("chat", chatSchema);