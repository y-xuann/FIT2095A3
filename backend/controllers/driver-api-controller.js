const Driver = require("../models/driver");
const Package = require("../models/package");
const {getCounters, saveData} = require("./counter")
let state = require("../models/login-state")

module.exports = {
    /**
     * API Handler method which creates a new driver and saves it to the database.
     * @async
     * @function
     * @param {string} path - Express path
     * @param {function} callback - asynchronous callback function
     */
	insertDriver: async function (req, res) {
        //update the count value 
        if(state.loggedIn == true){
            try{
                //create a new driver 
                let newDriver = new Driver(req.body)
                await newDriver.save(); //save to the database
                
                // increment the counter and save the updated data
                getCounters().insert += 1
                saveData()
                return res.status(200).json({id: newDriver._id,
                    driverId: newDriver.driverId})
            }catch (err){
                return res.status(400).json({Error: err.message})
            }}
        else{
            return res.status(401).json({ "status": 'Please log in.'});
        }
	},

    /**
     * Handler method that lists all drivers 
     * @async     
     * @function
     * @param {string} path - Express path
     * @param {function} callback - asynchronous callback function
     */
	listDriver: async function (req, res) {
        if(state.loggedIn == true){
            //increment the retrieve counter and save the updated data
            getCounters().retrieve += 1
            saveData()

            // retrieve all drivers and their assigned packages
            let drivers = await Driver.find({}).populate("assignedPackages")
            
            // respond with a list of drivers
            return res.json(drivers);}
        else{
            return res.status(401).json({ "status": 'Please log in.'});
            }
	},

    /**
     * Handler method to delete driver based on the mongodbID via query string 
     * @async
     * @function
     * @param {string} path - Express path
     * @param {function} callback - asynchronous callback function
     */
    deleteDriver: async function (req, res) {
        if(state.loggedIn == true){
            try{
                // retrieve the list of assignedPackages in driver object
                let driver = await Driver.findById(req.query.id)

                // Delete all assigned packages
                for (let packageId of driver.assignedPackages) {
                    await Package.findOneAndDelete({ _id: packageId });
                }
                await Driver.findOneAndDelete({_id: req.query.id});

                // Update delete counter and save data
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
            return res.status(401).json({"status": 'Please log in.'});
            }
	},

    /**
     * API Handler method to update a driver's details (driver license and department)
     * @async
     * @function
     * @param {string} path - Express path
     * @param {function} callback - asynchronous callback function
     */
    updateDriver: async function (req,res){
        if(state.loggedIn == true){
            try {
                //find driver by id 
                let driver = await Driver.findById(req.body.id)
                
                if (!driver){
                    return res.status(404).json({ status: "ID not found" });
                }
                
                // manually update to trigger the validation
                console.log(req.body)
                driver.driverLicense = req.body.driverLicense;
                driver.driverDepartment = req.body.driverDepartment;
                await driver.save();
                
                // update the update counter and save data 
                getCounters().update += 1
                saveData()
                
                return res.status(200).json({ status: "Driver updated successfully" });

            } catch (err) {
                return res.status(400).json({Error: err.message})}}
        else{
            return res.status(401).json({"status": 'Please log in.'});
            }
    }}

