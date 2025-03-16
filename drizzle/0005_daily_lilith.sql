CREATE TABLE "contacts" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"cardId" text NOT NULL,
	"contact" text NOT NULL,
	CONSTRAINT "contacts_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "businessCard" DROP CONSTRAINT "businessCard_ownedBy_user_id_fk";
--> statement-breakpoint
ALTER TABLE "businessCard" ALTER COLUMN "tags" SET DATA TYPE json;--> statement-breakpoint
ALTER TABLE "businessCard" ALTER COLUMN "tags" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "businessCard" ADD COLUMN "shareslug" text;--> statement-breakpoint
ALTER TABLE "businessCard" ADD COLUMN "shareception" boolean NOT NULL;--> statement-breakpoint
ALTER TABLE "businessCard" ADD COLUMN "info_visibility" text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_cardId_businessCard_id_fk" FOREIGN KEY ("cardId") REFERENCES "public"."businessCard"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_contact_user_id_fk" FOREIGN KEY ("contact") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "businessCard" DROP COLUMN "ownedBy";--> statement-breakpoint
ALTER TABLE "businessCard" DROP COLUMN "sharelink";