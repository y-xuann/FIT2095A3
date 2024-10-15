const express = require("express");
const userAPICont = require("../controllers/user-api-controller");

const router = express.Router();

/**
 * API Route to handle user login.
 * @name POST /login
 * @function
 * @description Call the handler method loginUser()
 * @example POSTMAN body
        {
            "username":"aaaaaaaaaa",
            "password":"12121"
        }
 */
router.post("/login", userAPICont.loginUser);

/**
 * API Route to handle user signup.
 * @name POST /signup
 * @function
 * @description Call the handler method signUpUser
 * @example POSTMAN body
        {
            "username":"aaaaaaaaaa",
            "password":"12121",
            "confirm_password":"12121"
        }
 */
router.post("/signup", userAPICont.signUpUser);
module.exports = router;
