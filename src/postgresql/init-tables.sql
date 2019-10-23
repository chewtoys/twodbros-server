CREATE TABLE IF NOT EXISTS "posts" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "created_at" DATE NOT NULL,
    "tags" TEXT [] NOT NULL,
    "content" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    PRIMARY KEY ("id")
);
