import mongoose, { Schema, Document } from "mongoose";

export interface ITweet extends Document {
    originalCaption: string;
    summarizedCaption: string;
    postedAt?: Date;
}

const TweetSchema = new Schema<ITweet>({
    originalCaption: { type: String, required: true },
    summarizedCaption: { type: String, required: true },
    postedAt: { type: Date },
});

export const Tweet = mongoose.model<ITweet>("Tweet", TweetSchema);
