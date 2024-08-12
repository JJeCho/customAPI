// virusScanRouter.js

const express = require('express');
const axios = require('axios');
const multer = require('multer');
const FormData = require('form-data');
const fs = require('fs');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

// Configure multer for file upload
const upload = multer({ dest: 'uploads/' });

// Route to scan a file for viruses and retrieve the results
router.post('/scan-file', upload.single('file'), async (req, res) => {
    const filePath = req.file.path;

    try {
        console.log(`Received request to scan file at path: ${filePath}`);

        // Prepare the form data
        const form = new FormData();
        form.append('file', fs.createReadStream(filePath));

        console.log('Sending request to VirusTotal API for file scanning...');
        // Send the request to the VirusTotal API v3
        const scanResponse = await axios.post('https://www.virustotal.com/api/v3/files', form, {
            headers: {
                ...form.getHeaders(),
                'x-apikey': process.env.VIRUSTOTAL_API_KEY, // Replace with your actual API key
            }
        });

        console.log('Received response from VirusTotal API:', scanResponse.data);

        // Extract the analysis ID and URL to check the results
        const analysisId = scanResponse.data.data.id;
        const analysisUrl = `https://www.virustotal.com/api/v3/analyses/${analysisId}`;

        console.log(`Analysis ID: ${analysisId}`);
        console.log(`Checking results at: ${analysisUrl}`);

        // Poll the VirusTotal API to get the results of the analysis
        const resultResponse = await axios.get(analysisUrl, {
            headers: {
                'x-apikey': process.env.VIRUSTOTAL_API_KEY, // Replace with your actual API key
            }
        });

        console.log('Received analysis results from VirusTotal API:', resultResponse.data);

        // Return the analysis results
        res.json(resultResponse.data);
    } catch (error) {
        console.error('Error occurred while processing:', error.message);
        if (error.response) {
            console.error('Error response data:', error.response.data);
            console.error('Error response status:', error.response.status);
        }
        res.status(500).json({ error: error.message, details: error.response ? error.response.data : 'No additional details' });
    } finally {
        // Clean up the uploaded file
        console.log(`Cleaning up uploaded file at path: ${filePath}`);
        fs.unlinkSync(filePath);
    }
});


// Route to scan a URL using the WOT API
router.post('/scan-url', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        console.warn('No URL provided for scanning.');
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        console.log(`Received request to scan URL: ${url}`);

        // Prepare the data for the API request
        const requestData = {
            url: url,
            visibility: "public" // Can be "public" or "private"
        };

        console.log('Sending request to URLScan.io API for URL scanning...');
        // Send the request to the URLScan.io API
        const response = await axios.post('https://urlscan.io/api/v1/scan/', requestData, {
            headers: {
                'API-Key': process.env.URL_API_KEY, // Replace with your actual API key
                'Content-Type': 'application/json'
            }
        });

        console.log('Received response from URLScan.io API:', response.data);
        // Return the scan initiation results (including the result page link)
        res.json(response.data);
    } catch (error) {
        console.error('Error occurred while scanning URL:', error.message);
        if (error.response) {
            console.error('Error response data:', error.response.data);
            console.error('Error response status:', error.response.status);
        }
        res.status(500).json({ error: error.message, details: error.response ? error.response.data : 'No additional details' });
    }
});

module.exports = router;
