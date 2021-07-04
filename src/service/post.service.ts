import { WELCOME_MESSAGE } from "../constants";
import { IPost } from "../interfaces/post.interface";
import { Post } from "../models/post.model";

export class PostService {
  public getWelcomeMessage() {
    return WELCOME_MESSAGE;
  }

  public getAll(): Promise<IPost[]> {
    return Post.find({}).exec();
  }

  public add(post: IPost): Promise<IPost> {
    const newPost = new Post(post);
    return newPost.save();
  }

  public async delete(id: string) {
    return Post.findByIdAndDelete(id).exec();
  }

  public async update(id: string, post: IPost) {
    return Post.findByIdAndUpdate(id, post).exec();
  }
}
