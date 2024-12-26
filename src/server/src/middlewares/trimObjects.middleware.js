/** __________ Trim Middleware for Nested Fields in Objects __________ */
export const trimObjects = (req, res, next) => {
  const trimFields = (obj) => {
    if (typeof obj === "object" && obj !== null) {
      for (const key in obj) {
        if (typeof obj[key] === "string") {
          obj[key] = obj[key].trim();
        } else if (Array.isArray(obj[key])) {
          obj[key] = obj[key].map((item) => trimFields(item));
        } else if (typeof obj[key] === "object" && obj[key] !== null) {
          trimFields(obj[key]);
        }
      }
    }
    return obj;
  };

  try {
    req.body = trimFields(req.body);
    next();
  } catch (error) {
    console.error("Error in trimObjects middleware:", error);
    res.status(500).json({ message: "Error processing data" });
  }
};
