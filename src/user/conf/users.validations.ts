import * as joi from 'joi';

export const createUserSchema = {
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    passwordConfirmation: joi.string().required(),
 };