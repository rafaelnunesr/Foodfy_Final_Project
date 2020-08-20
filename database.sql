-- ================================== 
--          INITIAL SETUP
-- ==================================

DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

DROP DATABASE IF EXISTS foodfy;
CREATE DATABASE foodfy;

  -- CREATE PROCEDURE
CREATE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ================================== 
--            TABLE CHEFS
-- ==================================

  -- CREATE TABLE CHEFS (COMPLETE TABLE WITH AND WITHOUT DELETED CHEFS)
CREATE TABLE "chefs_with_deleted" (
    "id" SERIAL PRIMARY KEY,
    "name" text NOT NULL,
    "created_at" timestamp DEFAULT (now()),
    "updated_at" timestamp DEFAULT (now()),
    "deleted_at" timestamp
);

  -- AUTO UPDATE AT CHEFS (COMPLETE TABLE WITH AND WITHOUT DELETED CHEFS)
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON chefs_with_deleted
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

  -- CREATE VIEW (CHEFS) WITHOUT DELETED CHEFS
CREATE VIEW chefs AS
SELECT * FROM chefs_with_deleted WHERE deleted_at IS NULL;

-- ================================== 
--            TABLE USERS
-- ==================================

  -- CREATE TABLE USERS COMPLETE TABLE WITH AND WITHOUT DELETED USERS)
CREATE TABLE "users_with_deleted" (
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

  -- AUTO UPDATE AT USERS (COMPLETE TABLE WITH AND WITHOUT DELETED USERS)
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON users_with_deleted
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

  -- CREATE VIEW (USERS) WITHOUT DELETED CHEFS
CREATE VIEW users AS
SELECT * FROM users_with_deleted WHERE deleted_at IS NULL;

-- ================================== 
--      TABLE PROFILE FILES
-- ==================================

CREATE TABLE "profile_files_with_deleted" (
  "id" SERIAL PRIMARY KEY,
  "chef_id" int,
  "user_id" int,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now()),
  "deleted_at" timestamp
);

-- AUTO UPDATE AT USERS CHEFS FILES (COMPLETE TABLE WITH AND WITHOUT DELETED USERS CHEFS FILES)
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON profile_files_with_deleted
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

  -- CREATE VIEW (USERS CHEFS FILES) WITHOUT DELETED USERS CHEFS FILES
CREATE VIEW profile_files AS
SELECT * FROM profile_files_with_deleted WHERE deleted_at IS NULL;

 -- FOREIGN KEYS
ALTER TABLE "profile_files_with_deleted" ADD FOREIGN KEY ("chef_id") REFERENCES "chefs_with_deleted" ("id");
ALTER TABLE "profile_files_with_deleted" ADD FOREIGN KEY ("user_id") REFERENCES "users_with_deleted" ("id");

-- ================================== 
--          TABLE RECIPES
-- ==================================

  -- CREATE TABLE RECIPES (COMPLETE TABLE WITH AND WITHOUT DELETED RECIPES)
CREATE TABLE "recipes_with_deleted" (
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

  -- AUTO UPDATE AT RECIPES (COMPLETE TABLE WITH AND WITHOUT DELETED RECIPES)
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON recipes_with_deleted
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

  -- CREATE VIEW (RECIPES) WITHOUT DELETED CHEFS
CREATE VIEW recipes AS
SELECT * FROM recipes_with_deleted WHERE deleted_at IS NULL;

 -- FOREIGN KEYS
ALTER TABLE "recipes_with_deleted" ADD FOREIGN KEY ("chef_id") REFERENCES "chefs_with_deleted" ("id");
ALTER TABLE "recipes_with_deleted" ADD FOREIGN KEY ("user_id") REFERENCES "users_with_deleted" ("id");

-- ================================== 
--        TABLE RECIPE FILES
-- ==================================

-- CREATE TABLE RECIPE FILES (COMPLETE TABLE WITH AND WITHOUT DELETED RECIPE FILES)
CREATE TABLE "recipe_files_with_deleted" (
  "id" SERIAL PRIMARY KEY,
  "recipe_id" integer NOT NULL,
  "file_id" integer NOT NULL,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now()),
  "deleted_at" timestamp
);

-- AUTO UPDATE AT RECIPE FILES (COMPLETE TABLE WITH AND WITHOUT DELETED RECIPE FILES)
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON recipe_files_with_deleted
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

  -- CREATE VIEW (RECIPE FILES) WITHOUT DELETED RECIPE FILES
CREATE VIEW recipe_files AS
SELECT * FROM recipe_files_with_deleted WHERE deleted_at IS NULL;

 -- FOREIGN KEYS
ALTER TABLE "recipe_files_with_deleted" ADD FOREIGN KEY ("recipe_id") REFERENCES "recipes_with_deleted" ("id");

-- ================================== 
--        TABLE FILES
-- ==================================

-- CREATE TABLE FILES (COMPLETE TABLE WITH AND WITHOUT DELETED FILES)
CREATE TABLE "files_with_deleted" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "path" text NOT NULL,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now()),
  "deleted_at" timestamp
);

-- AUTO UPDATE AT FILES (COMPLETE TABLE WITH AND WITHOUT DELETED FILES)
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON files_with_deleted
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

  -- CREATE VIEW (RECIPE FILES) WITHOUT DELETED RECIPE FILES
CREATE VIEW files AS
SELECT * FROM files_with_deleted WHERE deleted_at IS NULL;

-- ================================== 
--        TABLE ORDERS
-- ==================================

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
  "updated_at" timestamp NOT NULL
);

-- AUTO UPDATE AT ORDERS
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON orders
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

-- ================================== 
--        TABLE SESSION
-- ==================================

-- CREATE TABLE SESSION
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
  )
  WITH(OIDS=FALSE);
  ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ================================== 
--        TABLE SESSION
-- ==================================


-- ================================== 
--        SOFT DELETE
-- ==================================

CREATE OR REPLACE RULE delete_recipes AS
ON DELETE TO recipes_with_deleted DO INSTEAD
UPDATE recipes_with_deleted
SET deleted_at = now()
WHERE recipes_with_deleted.id = old.id;

CREATE OR REPLACE RULE delete_recipes AS
ON DELETE TO recipes_with_deleted DO INSTEAD
UPDATE recipes_with_deleted
SET deleted_at = now()
WHERE recipes_with_deleted.id = old.id;