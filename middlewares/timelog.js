// middleware/timeLog.js

const timeLog = (req, res, next) => {
    const currentTime = new Date().toISOString(); // Get the current time in ISO format
    const method = req.method; // HTTP method (GET, POST, etc.)
    const url = req.originalUrl; // Request URL
    const ip = req.ip; // Client IP address
    const queryParams = JSON.stringify(req.query); // Query parameters (if any)
    const body = JSON.stringify(req.body); // Request body (if any)
  
    console.log(`[${currentTime}] ${method} ${url} - IP: ${ip}`);
    if (Object.keys(req.query).length > 0) {
      console.log(`Query Params: ${queryParams}`);
    }
    if (Object.keys(req.body).length > 0) {
      console.log(`Request Body: ${body}`);
    }
    
    next(); // Call the next middleware function
  };
  
  module.exports = timeLog;
  