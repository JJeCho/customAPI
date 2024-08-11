const timeLog = (req, res, next) => {
    const currentTime = new Date().toISOString();
    const method = req.method;
    const url = req.originalUrl;
    const ip = req.ip;
    const queryParams = JSON.stringify(req.query); 
    const body = JSON.stringify(req.body); 
  
    console.log(`[${currentTime}] ${method} ${url} - IP: ${ip}`);
    if (Object.keys(req.query).length > 0) {
      console.log(`Query Params: ${queryParams}`);
    }
    if (Object.keys(req.body).length > 0) {
      console.log(`Request Body: ${body}`);
    }
    
    next(); 
  };
  
  module.exports = timeLog;
  