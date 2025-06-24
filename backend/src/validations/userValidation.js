const userSchema = require('../schemas/userSchema');

module.exports = {
  validateUser: (data) => userSchema.validate(data, { abortEarly: false }),
};
