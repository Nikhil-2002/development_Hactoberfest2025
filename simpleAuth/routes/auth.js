const express = require("express");
const router = express.Router();
const { User } = require("../models");
const { Ncryptor } = require("ncryptor");
/**
 * Register
 * POST /api/auth/register
 * body: { name, email, phone_number, password, usertype }
 */

const hasher = new Ncryptor();

router.post("/register", async (req, res) => {
  try {
    const { name, email, phone_number, password, usertype } = req.body;

    console.log(req.body);
    

    if (!email || !password) {
      return res
        .status(400)
        .json({ status: false, message: "email and password are required" });
    }

    // check existing by email
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res
        .status(200)
        .json({ status: false, message: "email already registered" });
    }


       const hashed = hasher.hash(password);


    const user = await User.create({
      name,
      email,
      phone_number,
      password : hashed,
      
      usertype: usertype || 0,
    });

    // remove password from response
    const { password: _, ...safeUser } = user.get({ plain: true });

    return res
      .status(201)
      .json({ status: true, message: "user created", user: safeUser });
  } catch (err) {
    console.error("Register error:", err);
    return res
      .status(500)
      .json({ status: false, message: "internal server error" });
  }
});

/**
 * Login
 * POST /api/auth/login
 * body: { email, password }
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "email and password required" });

    const user = await User.findOne({ where: { email } });
    
    if (!user) return res.status(401).json({ message: "invalid credentials" });



    // plain-text comparison (user requested no hashing)

    const isValid = await hasher.compare(password, user.password);

    if (isValid==false) {
      return res.status(200).json({ message: "Incorrect Password" });
    }

    // Respond with user data (omit password)
    const { password: _, ...safeUser } = user.get({ plain: true });

    return res.json({ message: "login successful", user: safeUser });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "internal server error" });
  }
});

module.exports = router;
