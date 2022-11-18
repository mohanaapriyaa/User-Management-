const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidateUser(data) {
  let errors = {};
  data.Email = !isEmpty(data.Email) ? data.Email : "";
  data.Name = !isEmpty(data.Name) ? data.Name : "";
  data.DOB = !isEmpty(data.DOB) ? data.DOB : "";

  if (!validator.isEmail(data.Email)) {
    errors.Email = "Format Email required";
  }
  if (validator.isEmpty(data.Email)) {
    errors.Email = "Required Email";
  }
  if (validator.isEmpty(data.Name)) {
    errors.Name = "Required Name";
  }
  if (validator.isEmpty(data.DOB)) {
    errors.DOB = "Required DOB";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
};
