import * as joi from 'joi';

export const createTaskSchema = {
   comment: joi.string().required(),
   subject: joi.string().required(),
   date: joi.date().min('now').timestamp('unix'),
};

export const updateTaskSchema = {
    id: joi.number().required(),
    comment: joi.string(),
    subject: joi.string(),
    date: joi.date().min('now').timestamp('unix'),
 };

export const deleteTaskSchema = {
     id: joi.number().required(),
 };