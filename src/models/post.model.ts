import { model, Schema } from "mongoose";
import { IPost } from "../interfaces/post.interface";

const PostSchema = new Schema({
  category: { type: String, required: [true, "Field is required"] },
  title: { type: String, required: [true, "Field is required"] },
  subtitle: { type: String, required: [true, "Field is required"] },
  subject: { type: String, required: [true, "Field is required"] },
  img_mini: { type: String, required: [true, "Field is required"] },
  img_cover: { type: String, required: [true, "Field is required"] },
});

export const Post = model<IPost>("Post", PostSchema);
