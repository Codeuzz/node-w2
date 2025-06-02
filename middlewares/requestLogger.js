export const requestLogger = (req, res, next) => {
  //   console.log(`[${req.method}] - [${req.path}] - response: [${res.status()}]`);
  res.on("finish", () => {
    console.log(`[${req.method}] - [${req.path}] - [${res.statusCode}]`);
  });
  next();
};
