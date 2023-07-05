function errorHandler(error, req, res, next) {
    console.log(error.stack);
    res.status(400).json({ result: "error", reason: error.message });
  }
  
  export { errorHandler };
  