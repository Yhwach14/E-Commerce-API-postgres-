const { prisma } = require("../db");
const {
  verifyToken,
  verifyTokenAndAutherization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();
const CryptoJS = require("crypto-js");


//UPDATE
router.put("/:id",verifyTokenAndAutherization, async (req, res) => {
  if(req.body.password){
      req.body.password = CryptoJS.AES.encrypt(
          req.body.password,
          process.env.PASS_SEC
          ).toString();
  };

  try {
    const { id } = req.params;
    const updatedUser = await prisma.users.update({
      where: { id: parseInt(id) },
      data: { name: req.body.name, email: req.body.email },
    });
    console.log(updatedUser);
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAutherization , async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.users.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json("User has been deleted ....");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER

router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await prisma.users.findFirstOrThrow({
      where: { id: parseInt(id) },
      include: { id: true , name : true, email:true },
    });
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL USER
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await prisma.users.findMany({
        take: 5,
        orderBy: {id: 'desc'}
      })
      : await prisma.users.findMany();
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
