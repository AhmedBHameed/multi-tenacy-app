import joi from 'joi'

const validateEmail = joi.string().email({tlds: {allow: false}}).required()

export default validateEmail
