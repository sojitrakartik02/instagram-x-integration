import mongoose, { Schema, Document } from "mongoose";

export interface IInstagramPost extends Document {
    caption: string;
    imageUrl: string;
    postedAt: Date;
}

const InstagramPostSchema = new Schema<IInstagramPost>({
    caption: { type: String, required: true },
    imageUrl: { type: String, required: true },
    postedAt: { type: Date, required: true },
});

export const InstagramPost = mongoose.model<IInstagramPost>("InstagramPost", InstagramPostSchema);
