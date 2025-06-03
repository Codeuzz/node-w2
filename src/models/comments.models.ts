import { eq, and } from "drizzle-orm";
import { db } from "../config/pool";
import { NewComment } from "../entities/Comments";
import { comments, posts, users } from "../schemas";
import logger from "../utils/logger";

export const commentModel = {
  create: (comment: NewComment) => {
    try {
      return db
        .insert(comments)
        .values(comment)
        .returning({
          id: comments.id,
        })
        .execute();
    } catch (err: any) {
      logger.error("could not create the comment" + err.message);
      throw new Error("the comment cannot be created");
    }
  },

  delete: (id: string, authorId: string) => {
    try {
      return db
        .delete(comments)
        .where(and(eq(comments.id, id), eq(comments.authorId, authorId)));
    } catch (err: any) {
      logger.error("Could not delete the comment " + err.message);
      throw new Error("The comment cannot be deleted");
    }
  },

  getAll: () => {
    try {
      return db
        .select({
          id: comments.id,
          content: comments.content,
          author: {
            id: users.id,
            username: users.username,
          },
          post: {
            id: posts.id,
            title: posts.title,
          },
        })
        .from(comments)
        .leftJoin(users, eq(comments.authorId, users.id))
        .leftJoin(posts, eq(comments.postId, posts.id))
        .execute();
    } catch (err: any) {
      logger.error("Could not get the comments" + err.message);
      return [];
    }
  },

  get: (id: string) => {
    try {
      return db
        .select({
          id: comments.id,
          content: comments.content,
          author: {
            id: users.id,
            username: users.username,
          },
        })
        .from(comments)
        .leftJoin(users, eq(comments.authorId, users.id))
        .where(eq(comments.id, id))
        .execute();
    } catch (err: any) {
      logger.error("Could not get the comment" + err.message);
      throw new Error("cannot get the comment ");
    }
  },

  update: (id: string, authorId: string, comment: NewComment) => {
    try {
      return db
        .update(comments)
        .set(comment)
        .where(and(eq(comments.id, id), eq(comments.authorId, authorId)))
        .execute();
    } catch (err: any) {
      logger.error("could not update the comment" + err.message);
      throw new Error("the comment cannot be updated");
    }
  },
};
