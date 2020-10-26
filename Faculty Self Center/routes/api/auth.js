// have faculty add etc

const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

const Faculty = require("../../models/Faculty");
const Admin = require("../../models/Admin");

//@route GET   api/auth
//@desc Test   Test router
//@access      Public
router.get("/", auth, async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.faculty.id).select("-password");
    res.json(faculty);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});



//@route         POST api/auth
//@desc          Authenticat User and get token
//@access        Public

router.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      let faculty = await Faculty.findOne({ email });

      if (!faculty) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      //bcrypt takes encrypt password and plain password entered

      const isMatch = await bcrypt.compare(password, faculty.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      //return json web token
      const payload = {
        faculty: {
          id: faculty.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);


//@route         POST api/faculty
//@desc          Authenticat User and get token
//@access        Public

// router.post(
//   "/",
//   [
//     check("email", "Email is required").isEmail(),
//     check("password", "Password required").exists(),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     const { email, password } = req.body;

//     try {
//       let faculty = await Faculty.findOne({ email });

//       if (!faculty) {
//         return res
//           .status(400)
//           .json({ errors: [{ msg: "Invalid credentials" }] });
//       }

//       //bcrypt takes encrypt password and plain password entered

//       const isMatch = await bcrypt.compare(password, faculty.password);

//       if (!isMatch) {
//         return res
//           .status(400)
//           .json({ errors: [{ msg: "Invalid credentials" }] });
//       }

//       //return json web token
//       const payload = {
//         faculty: {
//           id: faculty.id,
//         },
//       };

//       jwt.sign(
//         payload,
//         config.get("jwtSecret"),
//         { expiresIn: 3600000 },
//         (err, token) => {
//           if (err) throw err;
//           res.json({ token });
//         }
//       );
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("Server error");
//     }
//   }

  //console.log(req.body); //initialize middleware for it to work in index
// );
module.exports = router;
