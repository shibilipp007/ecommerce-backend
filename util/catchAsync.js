/**
 *
 * @param {(req: import("express").Request, res: import('express').Response, next: import('express').NextFunction) => Promise<any>} cb
 * @returns {(req: import("express").Request, res: import('express').Response, next: import('express').NextFunction) => void}
 */
const catchAsync = (cb) => async (req, res, next) => {
  try {
    await cb(req, res, next);
  } catch (error) {
    next(error);
  }
};

module.exports = catchAsync;
