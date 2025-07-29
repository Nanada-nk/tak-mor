import createError from "../utils/create-error.js"

const notFoundMiddleware = (req, res, next) => {
  next(createError(404, `Request: not found ${req.method} ${req.url} on this server`));
};

export default notFoundMiddleware;