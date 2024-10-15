const express = require("express");
const driverAPICont = require("../controllers/driver-api-controller");

const router = express.Router();
/**
 * API Route to create a new driver
 * @name POST /add
 * @function
 * @description Call the handler method insertDriver
 * @example POSTMAN body
        {
            "driverName":"Alex",
            "driverDepartment": "Food",
            "driverLicense":"ABC12",
            "driverIsActive":true
        }
 */
router.post("/add", driverAPICont.insertDriver);

/**
 * API Route to display the list of all drivers.
 * @name GET /
 * @function
 * @description Call the handler method listDriver()

 */
router.get("/", driverAPICont.listDriver);

/**
 * API Route to handle driver deletion via query string (e.g., ?id= mongodb driverId).
 * @name DELETE /delete
 * @function
 * @description Call the handler method deleteDriver()
 */
router.delete('/delete', driverAPICont.deleteDriver)

/**
 * API Route to update the driver 
 * @name PUT /update
 * @function
 * @description Call the handler method updateDriver()
 * @example POSTMAN body
        {
            "id": "66dbe2e35b8a76d865eea941", 
            "driverLicence": "XAA12",
            "driverDepartment": "Furniture"
        }
 */
router.put('/update', driverAPICont.updateDriver)

module.exports = router;