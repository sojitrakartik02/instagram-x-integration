import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
if (!MONGO_URL) {
    throw new Error(" MONGO_URL is not defined in .env file");
}

export const connectDatabase = async () => {
    try {
        await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as any);
        console.log("Database Connected ");
    } catch (err) {
        console.error(" Database Connection Failed:", err);
        process.exit(1);
    }
};
