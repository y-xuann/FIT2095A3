const admin = require("firebase-admin");

//Get a reference to the private key
const serviceAccount = require("./service-account.json");

// initialize the access to Firebase
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
// now, lets access Firestore database
const db = admin.firestore()

module.exports = db;
