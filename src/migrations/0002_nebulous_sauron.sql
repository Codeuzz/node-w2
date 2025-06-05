ALTER TABLE "reviews" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "reviews" CASCADE;--> statement-breakpoint
ALTER TABLE "books" DROP CONSTRAINT "books_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "published_year" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "published_year" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "user_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "books" ADD CONSTRAINT "books_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;