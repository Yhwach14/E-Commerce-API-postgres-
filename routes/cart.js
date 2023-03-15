const { prisma } = require("../db");
const {
  verifyToken,
  verifyTokenAndAutherization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const newCart = await prisma.cart.create();
    res.status(200).json(newCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAutherization, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCart = await prisma.cart.update({
      where: { id: parseInt(id) },
  });
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAutherization, async (req, res) => {
  try {
    await prisma.cart.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER CART
router.get("/find/:userId", verifyTokenAndAutherization, async (req, res) => {
  try {
    const cart = await prisma.cart.findFirstOrThrow({
       where: { id: parseInt(id)},
  });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await prisma.cart.findMany();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;