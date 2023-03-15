const router = require("express").Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { prisma } = require("../db");
//REGISTER
router.post("/register", async (req, res) => {
  const key128Bits = CryptoJS.PBKDF2(req.body.password, process.env.PASS_SEC, {
    keySize: 128 / 32,
  });

  try {
    const newUser = await prisma.users.create({
      data: {
        name: req.body.username,
        email: req.body.email,
        password: key128Bits,
      },
    });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await prisma.users.findFirst({
      where: { username: req.body.username },
    });
    if (!user) {
      return res.status(401).json("Wrong credentials!");
    }

    const hashedPassword = CryptoJS.PBKDF2(
      req.body.password,
      process.env.PASS_SEC,
      {
        keySize: 128 / 32,
      }
    ).toString();
    console.log(hashedPassword.toString());
    console.log(req.body.password);
    if (hashedPassword !== user.password) {
      return res.status(401).json("Wrong credentials!");
    }
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );
    const { password, ...others } = user;

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
