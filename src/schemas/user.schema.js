import {object, string, TypeOf, infer, number} from 'zod'

export const createUserSchema = object({
    name: string({
        required_error: 'Name is required',
    }),

    email: string({
        required_error: 'Email is required',
    }).email("Not a valid email address"),

    username: string({
        required_error: 'Username is required',
    }).min(8, 'Username too short').max(16, 'Username too long'),

    identification: number({
        required_error: 'Identification is required',
        invalid_type_error: "Identification must be a number",
    }),

    password: string({
        required_error: 'Password is required',
    }).min(6, 'Password too short'),

    active: number({
        required_error: 'Active is required',
        invalid_type_error: "Active must be a boolean",
    }),
})