import { and, eq } from "drizzle-orm";
import { db } from "../config/pool";
import { NewPost } from "../entities/Posts";
import { comments, posts, users } from "../schemas";
import logger from "../utils/logger";

export const postModel = {
  create: (post: NewPost) => {
    try {
      db.insert(posts)
        .values(post)
        .returning({
          id: posts.id,
          title: posts.title,
        })
        .execute();
    } catch (err: any) {
      logger.error("could not create the post" + err.message);
      throw new Error("the post cannot be created");
    }
  },

  delete: (id: string, authorId: string) => {
    try {
      return db
        .delete(posts)
        .where(and(eq(posts.id, id), eq(posts.author, authorId)));
    } catch (err: any) {
      logger.error("Could not delete the post " + err.message);
      throw new Error("The post cannot be deleted");
    }
  },

  getAll: () => {
    try {
      return db
        .select({
          id: posts.id,
          title: posts.title,
          content: posts.content,
          author: {
            id: users.id,
            username: users.username,
          },
          createdAt: posts.created_at,
        })
        .from(posts)
        .leftJoin(users, eq(comments.authorId, users.id))
        .execute();
    } catch (err: any) {
      logger.error("Could not get the posts" + err.message);
      return [];
    }
  },

  get: (id: string) => {
    try {
      return db
        .select({
          id: posts.id,
          title: posts.title,
          content: posts.content,
          author: {
            id: users.id,
            username: users.username,
          },
          comments: {
            id: comments.id,
            content: comments.content,
            createdAt: comments.createdAt,
          },
        })
        .from(posts)
        .leftJoin(users, eq(posts.author, users.id))
        .leftJoin(comments, eq(comments.postId, posts.id))
        .where(eq(posts.id, id))
        .execute();
    } catch (err: any) {
      logger.error("could not get the post" + err.message);
      throw new Error("cannot get the post");
    }
  },

  update: (id: string, authorId: string, post: NewPost) => {
    try {
      return db
        .update(posts)
        .set(post)
        .where(and(eq(posts.id, id), eq(posts.author, authorId)))
        .execute();
    } catch (err: any) {
      logger.error("could not update the post");
      throw new Error("the post cannot be updated");
    }
  },
};
