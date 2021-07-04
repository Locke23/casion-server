import { Request, Response, Router } from "express";
import { PostService } from "../service/post.service";

export class PostController {
  public router = Router();

  constructor(private postService: PostService) {
    this.setRoutes();
  }

  public setRoutes() {
    this.router.route("/").get(this.getWelcomeMessage).post(this.add);

    this.router.route("/all").get(this.getAll);

    this.router.route("/:id").put(this.update).delete(this.delete);
  }

  private getWelcomeMessage = (req: Request, res: Response) => {
    return res.json({ message: this.postService.getWelcomeMessage() });
  };

  private getAll = async (req: Request, res: Response) => {
    try {
      const posts = await this.postService.getAll();
      res.status(200).json(posts);
    } catch (e) {
      res.status(500).json(e.message);
    }
  };

  private add = async (req: Request, res: Response) => {
    try {
      const newPost = await this.postService.add(req.body);
      res.json(newPost);
    } catch (e) {
      res.status(500).json(e.message);
    }
  };

  private delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const deletedPostResult = await this.postService.delete(id);
      if (!deletedPostResult) {
        res
          .status(400)
          .json({ message: `post with id: ${id}, does not exist!` });
      }
      res.json({ deletedPostResult, message: "Post deleted successfully" });
    } catch (e) {
      res.status(500).json(e.message);
    }
  };

  private update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { post } = req.body;

      const updatedPostResult = await this.postService.update(id, post);
      if (!updatedPostResult) {
        res
          .status(400)
          .json({ message: `post with id: ${id}, does not exist!` });
      }
      res.json({ updatedPostResult, message: "Post updated successfully" });
    } catch (e) {
      res.status(500).json(e.message);
    }
  };
}
