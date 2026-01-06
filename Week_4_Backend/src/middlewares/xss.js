import xss from 'xss';

const sanitizeObject = (obj) => {
  if (!obj || typeof obj !== 'object') return;

  for (const key of Object.keys(obj)) {
    if (typeof obj[key] === 'string') {
      obj[key] = xss(obj[key]);
    } else if (typeof obj[key] === 'object') {
      sanitizeObject(obj[key]);
    }
  }
};

export const xssSanitize = (req, res, next) => {
  sanitizeObject(req.body);
  next();
};
