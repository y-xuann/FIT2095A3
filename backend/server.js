const mongoose = require("mongoose");
const express = require("express");
const app = require('express')();
const socketio = require('socket.io');
const http = require('http');
const server = http.createServer(app); // Create an HTTP server using Express app
const fs = require("fs");
const path = require("path");

// Import Google Generative AI API
const { GoogleGenerativeAI } = require("@google/generative-ai");
const gemini_api_key ="AIzaSyAGV7_8prRNBG5xMDCCNrO2Hw2KaBlmOtY";

// Initialize Google Generative AI with API key and configuration settings
const googleAI = new GoogleGenerativeAI(gemini_api_key);
const geminiConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 1,
  maxOutputTokens: 4096,
};

// Create a Generative AI model instance using the "gemini-pro" model
const geminiModel = googleAI.getGenerativeModel({
  model: "gemini-pro",
  geminiConfig,
});

// Initialise socket.io
const io = socketio(server, {
    cors: {
        origin: 'http://localhost:4200',
    }
}
);

//Import API route modules
const driverAPIRouter = require("./routes/driver-api-routes");
const packageAPIRouter = require("./routes/package-api-routes");
const userAPIRouter = require("./routes/user-api-routes");

//Import models
const Driver = require("./models/driver");
const Package = require("./models/package");
let state = require("./models/login-state"); //login state module to check if the user is logged in 

// Firebase configuration
const db = require("./firebase-config")

// Imports the Google Cloud client library
const {Translate} = require('@google-cloud/translate').v2;
const textToSpeech = require("@google-cloud/text-to-speech");

// Creates a client
const client = new textToSpeech.TextToSpeechClient();
const translate = new Translate()

// Middleware to parse incoming JSON request
app.use(express.json());

// Serve static files from specified directories
app.use(express.static('./dist/a3app/browser'));  // Serve frontend app
app.use(express.static('./public/output-audio'));  // Serve audio files
const url = "mongodb://localhost:27017/a3";

// Async function to connect to MongoDB
async function connect(url) {
	await mongoose.connect(url);
	return "Connected Successfully";
}

// Define API routes for drivers package and users
app.use("/33520496/Yang/api/v1/drivers", driverAPIRouter);
app.use("/33520496/Yang/api/v1/packages", packageAPIRouter);
app.use("/33520496/Yang/api/v1/users", userAPIRouter);

// Establish connection to MongoDB 
connect(url)
	.then(console.log)
	.catch((err) => console.log(err));

// Handle client connections via Socket.io
io.on("connection", (socket) => {
    // Counter for generating unique audio file names
    let i = 0

    // Handle translation requests from the client
    socket.on("translate", async data => {
        const { description, language } = data
        try{
            const [translation] = await translate.translate(description,language); // Perform translation
            socket.emit('translate',{description, translation}) // Send translation result to client
        } catch (err){
            console.error('Translation error:', err); 
            socket.emit('error', { message: 'Translation failed' }) // Send error message to client
        }
    });

    // Handle convert requests from the client to generate audio files 
    socket.on("convert", async data =>{
        i += 1 // Increment audio file counter
        const { text } = data;

        // Construct the request
        const request = {
            input: { text: text },
            voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
            audioConfig: { audioEncoding: "MP3" },
        };

        try{
            // Convert text to speech
            const [response] = await client.synthesizeSpeech(request);
            // Define the path where the audio file will be saved
            const audioPath = path.join(__dirname, '../public/output-audio', `output${i}.mp3`);

            // Write the binary audio content to a local file
            fs.writeFile(audioPath, response.audioContent, "binary", err =>{
                if (err) {
                    // console.error("ERROR:", err);
                    socket.emit('error', { message: 'Failed to save audio file' });
                } else{
                    // console.log("Audio content written to file:", audioPath);
                    socket.emit('convert', {message: 'Text converted to speech', audioFile: `output${i}.mp3` })
                }

            });
        } catch (err) {
            console.error("Text-to-Speech error:", err);
            socket.emit('error', { message: 'Text-to-Speech conversion failed' });
        }
    });

    // Handle language model requests to calculate distance
    socket.on("languageModel", async data =>{
        const { destination } = data; 
        try{
            const result = await geminiModel.generateContent(`Approximete shortest distance between ${destination} and Melbourne in kilometers`);
            extractedResult = result.response.candidates[0].content.parts // Extract response
            distance = extractedResult[0].text.match(/\d{1,3}(?:,\d{3})*(\.\d+)?/) // Extract distance from text
            if (distance){
                const output = distance ? distance[0].trim().replace(/[,]/g, '') : 'not available'; // Format distance
                socket.emit('success', {message: `Approximately ${output} kilometers`}) // Send result to client

            } else{
                socket.emit('success', {message: `Invalid destination`}) // Handle invalid destination
            }
        } catch (err){
            // console.log(err)
            socket.emit('error', { message: 'Language model failed' });
        }
    })
});

/**
 * API route for stats
 * @name GET /33520496/Yang/api/v1/stats
 * @function
 * @param {string} path - Express path
 * @param {function} callback - asynchronous callback function
 * @description Returns user statistics in JSON format if logged in, otherwise returns a 401 status
 */
app.get('/33520496/Yang/api/v1/stats', async function (req, res) {
    if (state.loggedIn === true) {
        // retrieve document from Firestore database
        const data = (await db.collection('data').doc('stats').get()).data();

        // sends the data in json format
        res.status(200).json({ data });
    } else {
        res.status(401).json({ "status": 'Please log in.' });
    }
});

/**
 * Route to handle undefined routes (404 error)
 * @name GET /*
 * @param {string} path - Express path
 * @param {function} callback - Express callback
 * @description Renders an error page for any route that is not defined.
 */
app.get('/*', function (req, res) {
    res.status(404).send("Not Found");
});

// Start the server and listen on port 8080
server.listen(8080)