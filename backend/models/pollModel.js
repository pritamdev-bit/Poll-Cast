import mongoose from "mongoose";

const pollSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        enum: ["Live", "Draft", "Closed"],
        default: "Draft",
    },

    statusColor: {
        type: String,
        enum: ["bg-green-500", "bg-red-500", "bg-gray-500"],
        default: "bg-gray-500",
    },
    
    icon: {
        type: String,
        enum: ["chart", "closed", "file"],
        default: "file",
    },

    iconBg: {
        type: String,
        enum: ["bg-green-100", "bg-red-100", "bg-gray-100"],
        default: "bg-gray-100",
    },

    iconColor: {
        type: String,
        enum: ["text-green-600", "text-red-600", "text-gray-600"],
        default: "text-gray-600",
    },

    author_id: {
        type: String,
        required: true,
    },

    author: {
        type: String,
        required: true,
    },

    votes: {
        type: Number,
        default: 0,
    },

    engagement: {
        type: Number,
        default: 0,
    },

    avgTime: {
        type: Number,
        default: 0,
    },

    action: {
        type: String,
        enum: ["View Results", "Continue Editing"],
        default: "Continue Editing",
    },

    validity: {
        type: Number,
        default: 15,
    },

    startTime: {
        type: Number,
    },

    expiresAt: {
        type: Number,
    },

    options: [
        {
            id: {
                type: String,
                required: true,
            },
            text: {
                type: String,
                required: true,
            },
            vote: {
                type: Number,
                default: 0,
            },
        },
    ],
}, {
    timestamps: true
});

pollSchema.index({ status: 1, expiresAt: 1 });

export default mongoose.model("Poll", pollSchema);