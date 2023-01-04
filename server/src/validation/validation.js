const validator = require("validator");

const employee_signup = (req) => {
  result = {
    message: "",
    status: false,
  };

  try {
    const username = req.body.username;
    const password1 = req.body.password1;
    const password2 = req.body.password2;
    const line1 = req.body.Line1;
    const line2 = req.body.Line2;
    const city = req.body.City;
    const district = req.body.District;
    const postal_code = req.body.Postal_Code;
    const emg_name = req.body.Name;
    const emg_phone_number = req.body.phone_number;
    const relationship = req.body.Relationship;
    const fisrtname = req.body.firstname;
    const lastname = req.body.lastname;
    const birthday = req.body.birthday;
    const email = req.body.email;
    const joined_date = req.body.Joined_date;
    const nic_number = req.body.nic_number;
    const phone_number1 = req.body.phonenumber1;
    const phone_number2 = req.body.phonenumber2;

    if (
      validator.isEmpty(username) ||
      validator.isEmpty(password1) ||
      validator.isEmpty(password2) ||
      validator.isEmpty(line1) ||
      validator.isEmpty(line2)||
      validator.isEmpty(city) ||
      validator.isEmpty(district) ||
      validator.isEmpty(postal_code) ||
      validator.isEmpty(emg_name) ||
      validator.isEmpty(emg_phone_number) ||
      validator.isEmpty(relationship) ||
      validator.isEmpty(fisrtname) ||
      validator.isEmpty(lastname) ||
      validator.isEmpty(birthday) ||
      validator.isEmpty(email) ||
      validator.isEmpty(joined_date) ||
      validator.isEmpty(nic_number) ||
      validator.isEmpty(phone_number1) ||
      validator.isEmpty(phone_number2)
    ) {
      result.message = "Input can't be empty";
      result.status = true;
      return result;
    }
    if (!validator.isEmail(email)) {
      result.message = "Invalid Email Format";
      result.status = true;
      return result;
    }
    if (!validator.isAlpha(fisrtname.replace(/ /gi, "s")) || !validator.isAlpha(lastname.replace(/ /gi, "s"))) {
      result.message = "First name and last name only needs alpha characters";
      result.status = true;
      return result;
    }
    if (
      !validator.isNumeric(phone_number1) ||
      !validator.isLength(phone_number1, { min: 10, max: 10 })
    ) {
      result.message = "Invalid Contact Number 1";
      result.status = true;
      return result;
    }
    if (
        !validator.isNumeric(phone_number2) ||
        !validator.isLength(phone_number1, { min: 10, max: 10 })
      ) {
        result.message = "Invalid Contact Number 2";
        result.status = true;
        return result;
      }
    if (
    !validator.isNumeric(emg_phone_number) &&
    !validator.isLength(emg_phone_number, { min: 10, max: 10 })
    ) {
    result.message = "Invalid Emergency Contact Number";
    result.status = true;
    return result;
    }
    if (!validator.isDate(birthday)) {
      result.message = "Invalid BirthDay";
      result.status = true;
      return result;
    }
    if (!validator.isDate(joined_date)) {
        result.message = "Invalid BirthDay";
        result.status = true;
        return result;
    }
    if (!validator.isNumeric(postal_code) ) {
        result.message = "Invalid Postal Code";
        result.status = true;
        return result;
    }
    if (password1 != password2 ) {
      result.message = "Passwords do not match";
      result.status = true;
      return result;
    }

  } catch (error) {
    result.message = "Input validation failed";
    result.status = true;
    return result;
  } finally {
    return result;
  }
};

const employee_update = (req) => {
  result = {
    message: "",
    status: false,
  };

  try {
    const line1 = req.body.line1;
    const line2 = req.body.line2;
    const city = req.body.city;
    const district = req.body.district;
    const postal_code = req.body.postal_code;
    const emg_name = req.body.name;
    const emg_phone_number = req.body.phone_number;
    const relationship = req.body.relationship;
    const fisrtname = req.body.firstname;
    const lastname = req.body.lastname;
    const birthday = req.body.birthday;
    const email = req.body.email;
    const joined_date = req.body.Joined_date;
    const nic_number = req.body.nic_number;
    const phone_number1 = req.body.phone1;
    const phone_number2 = req.body.phone2;

    if (
      validator.isEmpty(line1) ||
      validator.isEmpty(line2)||
      validator.isEmpty(city) ||
      validator.isEmpty(district) ||
      validator.isEmpty(postal_code) ||
      validator.isEmpty(emg_name) ||
      validator.isEmpty(emg_phone_number) ||
      validator.isEmpty(relationship) ||
      validator.isEmpty(fisrtname) ||
      validator.isEmpty(lastname) ||
      validator.isEmpty(birthday) ||
      validator.isEmpty(email) ||
      validator.isEmpty(joined_date) ||
      validator.isEmpty(nic_number) ||
      validator.isEmpty(phone_number1) ||
      validator.isEmpty(phone_number2)
    ) {
      result.message = "Input can't be empty";
      result.status = true;
      return result;
    }
    if (!validator.isEmail(email)) {
      result.message = "Invalid Email Format";
      result.status = true;
      return result;
    }
    if (!validator.isAlpha(fisrtname.replace(/ /gi, "s")) || !validator.isAlpha(lastname.replace(/ /gi, "s"))) {
      result.message = "First name and last name only needs alpha characters";
      result.status = true;
      return result;
    }
    if (
      !validator.isNumeric(phone_number1) &&
      !validator.isLength(phone_number1, { min: 10, max: 10 })
    ) {
      result.message = "Invalid Contact Number 1";
      result.status = true;
      return result;
    }
    if (
        !validator.isNumeric(phone_number2) &&
        !validator.isLength(phone_number1, { min: 10, max: 10 })
      ) {
        result.message = "Invalid Contact Number 2";
        result.status = true;
        return result;
      }
    if (
    !validator.isNumeric(emg_phone_number) &&
    !validator.isLength(emg_phone_number, { min: 10, max: 10 })
    ) {
    result.message = "Invalid Emergency Contact Number";
    result.status = true;
    return result;
    }
    if (!validator.isDate(birthday)) {
      result.message = "Invalid BirthDay";
      result.status = true;
      return result;
    }
    if (!validator.isDate(joined_date)) {
        result.message = "Invalid BirthDay";
        result.status = true;
        return result;
    }
    if (!validator.isNumeric(postal_code) ) {
        result.message = "Invalid Postal Code";
        result.status = true;
        return result;
    }
   

  } catch (error) {
    result.message = "Input validation failed";
    result.status = true;
    return result;
  } finally {
    return result;
  }
};

const add_job_title = (req) => {
  result = {
    message: "",
    status: false,
  };

  try {
    const title = req.body.title;
    if (
      validator.isEmpty(title)
    ) {
      result.message = "Input can't be empty";
      result.status = true;
      return result;
    }
  } catch (error) {
    result.message = "Input validation failed";
    result.status = true;
    return result;
  } finally {
    return result;
  }
};

module.exports = {
    employee_signup,
    employee_update,
    add_job_title
}
