const requestTime = (req, res, next) => {
    req.requestTime = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - req.requestTime;
      console.log(`${req.method} ${req.originalUrl} took ${duration}ms`);
    });
    next();
  };
  
  module.exports = requestTime;
  