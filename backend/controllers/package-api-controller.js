const Package = require("../models/package");
const Driver = require("../models/driver");
const {getCounters, saveData} = require("./counter")
let state = require("../models/login-state")

module.exports = {
    /**
     * API Handler method which creates a new package and saves it to the database.
     * @async
     * @function
     * @param {string} path - Express path
     * @param {function} callback - asynchronous callback function
     */
	insertPackage: async function (req, res) {
        //check if the user is logged in
        if(state.loggedIn == true){
            try {
                let newPackage = new Package(req.body)
                await newPackage.validate() //validate package data
                let driver = await Driver.findOne({_id:req.body.driverId}) //find the driver associated with the package
                
                // If driver not found, send error response
                if (!driver) {
                    return res.status(404).json({ "status": 'Driver not found' });
                }

                // Add the new package mongodbID to the driver's assignedPackages array
                driver.assignedPackages.push(newPackage._id)
                await driver.save();
                await newPackage.save();

                // Update counters and save to database
                getCounters().insert += 1
                saveData()
                return res.status(200).json({id: newPackage._id,
                        packageId: newPackage.packageId})
            } catch (err) {
                return res.status(400).json({Error: err.message})
            }}
        else{
            return res.status(401).json({"status":'Please log in.'});
        }
	},

    /**
     * API Handler method that lists all packages
     * @async     
     * @function
     * @param {string} path - Express path
     * @param {function} callback - asynchronous callback function
     */
	listPackage: async function (req, res) {
        if(state.loggedIn == true){
            // Update retrieve counter and save data
            getCounters().retrieve += 1
            saveData()

            // Retrieve all packages and populate the driverId field
            let packages = await Package.find({}).populate("driverId")
            return res.json(packages);
        }else{
            return res.status(401).json({"status":'Please log in.'});
            }
	},

    /**
     * API Handler method to delete packages based on the mongodbID via route parameter
     * @async
     * @function
     * @param {string} path - Express path
     * @param {function} callback - asynchronous callback function
     */
    deletePackage: async function (req, res) {
        if(state.loggedIn == true){
            try{
                // find the package by ID
                let package = await Package.findById(req.params.id)

               // Find the driver assigned to this package
                let driver = await Driver.findById(package.driverId)
                
                // iterate over each element in assignedPackages and exclude the deleted package id 
                driver.assignedPackages = driver.assignedPackages.filter(
                    packageId => packageId.toString() !== package._id.toString()
                );
                await driver.save();

                // remove the package from the database
                await Package.findOneAndDelete({_id: req.params.id});
                
                // update the delete counter and save data 
                getCounters().delete += 1
                saveData()

                // Return the number of deleted documents
                return res.status(200).json({
                    acknowledged: true,
                    deletedCount: 1
                });

            }catch(err){
                return res.status(400).json({
                    acknowledged: false,
                    deletedCount: 0
                });
            }
        }else{
            return res.status(401).json({"status":'Please log in.'});
            }

	},

    /**
     * API Handler method to update a package's details (package destination)
     * @async
     * @function
     * @param {string} path - Express path
     * @param {function} callback - asynchronous callback function
     */
    updatePackage: async function (req,res){
        if(state.loggedIn == true){
            try {
                //find package by id
                let package = await Package.findById(req.body.packageId)
                
                // if package does not exist return a 404 error
                if (!package){
                    return res.status(404).json({status:"ID not found"});
                }
                
                // manually update to trigger the validation
                package.packageDestination = req.body.packageDestination;
                await package.save(); //save the updated package data

                // update the update counter and save data 
                getCounters().update += 1
                saveData()
                return res.status(200).json({status:"Package updated successfully"});

            } catch (err) {
                // Handle validation or update errors
                return res.status(400).json({Error: err.message})
    }}
    else{
        return res.status(401).json({"status":'Please log in.'});
        }
    }
}
