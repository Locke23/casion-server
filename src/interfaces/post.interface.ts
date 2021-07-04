import { Document } from "mongoose";

export interface IPost extends Document {
  category: string;
  title: string;
  subtitle: string;
  subject: string;
  img_mini: string;
  img_cover: string;
}
