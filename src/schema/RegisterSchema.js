import { set, z } from 'zod';

export const registerschema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" })
        .max(30, { message: "Name must be at most 30 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" })
        .max(30, { message: "Password must be at most 30 characters" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
    rePassword: z.string(),
    dateOfBirth: z.string().refine((date) => {
        const now = new Date();
        const dob = new Date(date);
        const age = now.getFullYear() - dob.getFullYear();
        if (age > 18) {
            return true;
        }
        if (age === 18) {
            if (now.getMonth() > dob.getMonth()) {
                return true;
            }
            if (now.getMonth() === dob.getMonth()) {
                if (now.getDate() >= dob.getDate()) {
                    return true;
                }
            }
        }
        return false;
    }, { message: "You must be at least 18 years old" }),
    gender: z.enum(['male', 'female'], {
        errorMap: () => ({ message: "Please select your gender" })
    })
})
    .refine((data) => data.password === data.rePassword, {
        message: "Passwords don't match",
        path: ["rePassword"],
    });
