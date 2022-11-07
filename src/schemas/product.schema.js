import {object, string, number} from 'zod'

export const createProductSchema = object({
    name: string({
        required_error: 'Name is required',
    }),

    quantity: number({
        required_error: 'Quantity is required',
        invalid_type_error: "Quantity must be a number",
    }),

    brand: string({
        required_error: 'Brand is required',
    }),

    owner: string({
        required_error: 'Owner is required',
        invalid_type_error: "Owner must be a string",
    }),
})