-- CREATE PROCEDURE
CREATE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- CREATE TABLE CHEFS
CREATE TABLE "chefs" (
    "id" SERIAL PRIMARY KEY,
    "name" text NOT NULL,
    "created_at" timestamp DEFAULT (now()),
    "updated_at" timestamp DEFAULT (now()),
    "deleted_at" timestamp
);

-- AUTO UPDATE AT CHEFS
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON chefs
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

-- CREATE TABLE USERS
CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "is_admin" BOOLEAN NOT NULL,
  "email" text NOT NULL,
  "password" text NOT NULL,
  "reset_token" text,
  "reset_token_expires" text,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now()),
  "deleted_at" timestamp
);

-- AUTO UPDATE AT USERS
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

-- CREATE TABLE RECIPES
CREATE TABLE "recipes" (
  "id" SERIAL PRIMARY KEY,
  "chef_id" integer,
  "user_id" integer,
  "ingredients" text NOT NULL,
  "preparation" text NOT NULL,
  "information" text NOT NULL,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now()),
  "deleted_at" timestamp
);

-- AUTO UPDATE AT USERS
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON recipes
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

-- CREATE TABLE RECIPE FILES
CREATE TABLE "recipe_files" (
  "id" SERIAL PRIMARY KEY,
  "recipe_id" integer NOT NULL,
  "file_id" integer NOT NULL,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now()),
  "deleted_at" timestamp
);

-- AUTO UPDATE AT RECIPE FILES
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON recipe_files
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

-- CREATE TABLE FILES
CREATE TABLE "files" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "path" text NOT NULL,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now()),
  "deleted_at" timestamp
);

-- AUTO UPDATE AT FILES
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON files
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

-- CREATE TABLE ORDERS
CREATE TABLE "orders" (
  "id" SERIAL PRIMARY KEY,
  "seller_id" int NOT NULL,
  "buyer_id" int NOT NULL,
  "recipe_id" int NOT NULL,
  "price" int NOT NULL,
  "quantity" int NOT NULL,
  "total" int NOT NULL,
  "status" text NOT NULL,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp NOT NULL,
  "deleted_at" timestamp
);

-- CREATE TABLE SESSION
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
  )
  WITH(OIDS=FALSE);
  ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- CASCADE EFFECT WHEN DELETE USER, CHEF AND RECIPES
ALTER TABLE "recipes"
DROP CONSTRAINT recipes_user_id_fkey,
DROP CONSTRAINT recipes_chef_id_fkey,
ADD CONSTRAINT recipes_user_id_fkey,
ADD CONSTRAINT recipes_chef_id_fkey,
FOREIGN KEY ("user_id")
FOREIGN KEY ("chef_id")
REFERENCES "users" ("id")
REFERENCES "chefs" ("id")
ON DELETE CASCADE;

ALTER TABLE "files"
DROP CONSTRAINT files_recipe_id_fkey,
ADD CONSTRAINT files_recipe_id_fkey
FOREIGN KEY ("recipe_id")
REFERENCES "recipes" ("id")
ON DELETE CASCADE;