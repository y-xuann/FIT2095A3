const db = require("../firebase-config")
let state = require("../models/login-state")

module.exports = { 
    /** 
     * API Handler method to handle user login
     * @async 
     * @function
     * @param {string} path - Express path
     * @param {function} callback - asynchronous callback function
     * @description check if the username and password exist or not 
    */
    loginUser: async function(req,res){
        // get the data
        let invalidUser = true;
        const data = await db.collection('users').get();
        data.forEach((doc) => {
            if (doc.data().username == req.body.username && doc.data().password == req.body.password){
                invalidUser = false;
                state.loggedIn = true;
                res.status(200).json({
                    "isAuthenticated": true,
                    "status": "Login successful"})
        }})
        if (invalidUser){
            res.status(400).json({                    
                "isAuthenticated":false,
                "status": "Login fail"})}
    },

    /** 
     * API Handler method to handle user signup page
     * @async
     * @function
     * @param {string} path - Express path
     * @param {function} callback - asynchronous callback function
     * @description perform validation check 
    */
    signUpUser: async function(req,res){
        // validation check
        if (req.body.username.length < 6 || !isAlphaNumeric(req.body.username)){
            res.status(400).json({"status": "Signup fail. Invalid username"})
        }
        else if(req.body.password.length < 5 || req.body.password.length > 10){
            res.status(400).json({"status": "Signup fail. Invalid password"})
        }
        else if(req.body.password != req.body.confirm_password){
            res.status(400).json({"status": "Signup fail. Invalid confirmed password"})
        }
        else{
            // the collection name is user
            await db.collection('users')
                .doc() // the key of the document (auto generated for this case)
                .set({'password':req.body.password,
                    'username':req.body.username
            });
            res.status(200).json({"status": "Signup successful"})
        }
    }
}

/**
 * Checks if a string contains only alphanumeric characters (letters and numbers).
 * @function
 * @param {string} str - The string to be tested.
 * @returns {boolean} - Returns `true` if the string contains only alphanumeric characters; `false` otherwise.
 */
function isAlphaNumeric(str){
    return /^[a-z0-9]*$/gi.test(str);
}


