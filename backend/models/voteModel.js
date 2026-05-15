import mongoose from "mongoose";

const voteSchema = new mongoose.Schema({
    poll_id: {
        type: String,
        required: true,
    },
    
    voter_id: {
        type: String,
        required: true,
    },

    voteOption: {
        type: Number,
        required: true,
    },


}, {
    timestamps: true,
});

export default mongoose.model("Vote", voteSchema);