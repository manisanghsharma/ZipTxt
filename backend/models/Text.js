import mongoose from "mongoose";

const textSchema = new mongoose.Schema({
    code: {type: String, unique: true},
    content: String,
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 86400
    }
})

const Text = mongoose.model("Text", textSchema);
export default Text