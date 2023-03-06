import mongoose from "mongoose";

const AdminUserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            maxlength: 60,
        },
        password: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

export default mongoose.models.ADMIN ||
    mongoose.model("ADMIN", AdminUserSchema);
