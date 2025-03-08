const validateRegister = (email, password, confirmPassword, firstName, lastName) => {
    if (!email) return "Please enter your email address";
    if (!firstName) return "Please enter your first name";
    if (!lastName) return "Please enter your last name";
    if (!password) return "Please enter a password";
    if (password.length < 8) return "Password must be at least 8 characters long";
    if (password !== confirmPassword) return "Passwords do not match";
  };
  
  const validateLogin = (email, password) => {
    if (!email) return "Please enter your email address";
    if (!password) return "Please enter your password";
  };
  
  module.exports = {
    validateRegister,
    validateLogin,
  };
  