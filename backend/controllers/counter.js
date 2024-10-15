const db = require("../firebase-config")

// Create a global variable to track operation counters
let counters = {
    insert: 0,
    retrieve: 0,
    update: 0,
    delete: 0
}

/**
 * Retrieves the current counters for various operations.
 * @function
 * @returns {Object} - An object containing the current counters for insert, retrieve, update, and delete operations.
 */
function getCounters() {
    return counters;
}

/**
 * Saves the current operation counters to the Firestore database.
 * @async
 * @function
 */
async function saveData(){
    let stats = getCounters();
    // the collection name (table) is data
    await db.collection('data')
        .doc('stats') // the key of the document (not auto generated for this case)
        .set({'delete':stats.delete,
            'insert':stats.insert, 
            'retrieve':stats.retrieve, 
            "update":stats.update});
}

/**
 * Saves the current operation counters to the Firestore database.
 * @async
 * @function
 */
module.exports={saveData, getCounters}