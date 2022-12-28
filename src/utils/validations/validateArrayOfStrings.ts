import joi from 'joi'

const validateArrayOfStrings = joi.array().items(joi.string()).required()

export default validateArrayOfStrings
