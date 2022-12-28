import joi from 'joi';

const validatePassword = joi
  .string()
  .pattern(
    /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,255}$/
  )
  .messages({
    'string.pattern.base':
     "Invalid passeord. Password should at least have - one number - one small letter - one capital letter - on special charactor - and between 8 to 255",
  });

export default validatePassword;
