CREATE TABLE "logos_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"link" text NOT NULL,
	"primary_color" text NOT NULL,
	"background_color" text NOT NULL,
	"username" text NOT NULL,
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
