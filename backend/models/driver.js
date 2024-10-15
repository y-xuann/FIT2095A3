const mongoose = require("mongoose");

/**
 * Schema for the driver model.
 * @module driver
 * @type {Object}
 * @property {String} driverId - Driver id which act as a unique identifier for the driver
 * @property {String} driverName - Name of the driver, must be alphabets with length between 3 and 20
 * @property {Number} driverDepartment - Department of the driver, must be either food, furniture or electronic
 * @property {String} driverLicense - Driver's license number, must be alphanumeric with length of 5
 * @property {String} driverIsActive - Indicates if the driver is active.
 * @property {String} createdAt - Timestamp indicating when the driver was created.
 * @property {Array} assignedPackages - Array of ObjectIds referencing the assigned packages.

 */
const driverSchema = mongoose.Schema({

    driverId: {
        type: String,
        default: generateId
    },

	driverName: {
		type: String,
        validate:{
            validator: function (name){
                return name.length >= 3 && name.length <= 20 && isAlpha(name) 
            },
            message: "Invalid driver's name."
        },
		required: true,
	},

    driverDepartment:{
        type: String,
        validate:{
            validator: function(department){
                const DRIVER_DEPARTMENT =["food", "furniture", "electronic"]
                return DRIVER_DEPARTMENT.includes(department.toLowerCase())
            },
            message: "Invalid driver's department."
        },
        required: true,
    },

    driverLicense:{
        type: String,
        validate:{
            validator: function(license){
                return license.length == 5 && isAlphaNumeric(license)
            },
            message: "Invalid driver's license."
        },
        required: true,

    },

    driverIsActive:{
        type: Boolean,
        required:true
    },

    driverCreatedAt: {
        type: String,
        default: generateDate
    },

    assignedPackages: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Package",
		},
	],
});

// Export the Driver model based on the schema.
module.exports = mongoose.model("Driver", driverSchema);


/**
 * Generates an unique ID for the driver 
 * @returns {String}
 */
function generateId(){
    const FIRST_LETTER = 'D';
    const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let randomLetters = '';
    for (let i = 1; i <= 3; i++){
        randomLetters += LETTERS.charAt(Math.floor(Math.random() * LETTERS.length));
    }

    let randomDigits = Math.floor(Math.random()* 90 + 10);
    const STUDENT_ID = 33;
    return (`${FIRST_LETTER}${randomDigits}-${STUDENT_ID}-${randomLetters}`)

}

/**
 * Generates the current date and time in a localized string format.
 * @function
 * @returns {String} - A string representing the current date and time.
 */
function generateDate(){
    var today = new Date();
    return(today.toLocaleString());
}

/**
 * Check if a string contains only alphabetic character
 * @function
 * @param {string} str - The string to be tested  
 * @returns {boolean} - Returns `true` if the string contains only alphabetic characters; `false` otherwise.
 */
function isAlpha(str){
    return /^[a-zA-Z]*$/.test(str);
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
