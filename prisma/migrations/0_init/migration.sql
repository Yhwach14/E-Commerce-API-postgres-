-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(30),
    "email" VARCHAR(30),
    "password" VARCHAR(30),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart" (
    "id" VARCHAR(30) NOT NULL,
    "productid" VARCHAR(30),
    "quantity" DECIMAL,
    "userID" VARCHAR(30)[],

    CONSTRAINT "cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" VARCHAR(30) NOT NULL,
    "productid" VARCHAR(30),
    "quantity" DECIMAL,
    "amount" DECIMAL,
    "address" VARCHAR(30),
    "status" VARCHAR(30),
    "userID" VARCHAR(30)[],

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "title" VARCHAR(30),
    "description" VARCHAR(30),
    "img" VARCHAR(30),
    "categories" TEXT[],
    "size" VARCHAR(30),
    "color" VARCHAR(30),
    "price" DECIMAL,
    "id" VARCHAR(30)[],

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

