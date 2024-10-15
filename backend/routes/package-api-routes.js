const express = require("express");
const packageAPICont = require("../controllers/package-api-controller");

const router = express.Router();

/**
 * API Route to create a new package
 * @name POST /add
 * @function
 * @description Call the handler method insertPackage
 * @example POSTMAN body
        {
        "packageTitle": "PixelPhones",
        "packageWeight":1.25,
        "packageDestination": "Melbourne",
        "isAllocated":true,
        "driverId": "66deb51c00dca1f907a58891"
        }
 */
router.post("/add", packageAPICont.insertPackage);

/**
 * API Route to display the list of all packages.
 * @name GET /
 * @function
 * @description Call the handler method listPackage()
 */
router.get("/", packageAPICont.listPackage);

/**
 * API Route to handle package deletion via route parameter
 * @name DELETE /delete
 * @function
 * @description Call the handler method deletePackage()
 * 
 */
router.delete('/delete/:id', packageAPICont.deletePackage)

/**
 * API Route to update the package
 * @name PUT /update
 * @function
 * @description Call the handler method updatePackage()
 * @example POSTMAN body
        {
            "packageId":"66dc45831e3c92aed0390a65",
            "packageDestination":"Perth"
        }
 */
router.put('/update', packageAPICont.updatePackage)

module.exports = router;