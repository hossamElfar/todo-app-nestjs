import * as joi from 'joi';

export const createTaskSchema = {
   comment: joi.string().required(),
   subject: joi.string().required(),
};

export const updateTaskSchema = {
    id: joi.number().required(),
    comment: joi.string(),
    subject: joi.string(),
 };

export const deleteTaskSchema = {
     id: joi.number().required(),
 };