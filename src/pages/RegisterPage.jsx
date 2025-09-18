import { Button, Input, Select, SelectItem } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { set, z } from 'zod';
import { registerApi } from '../services/authservices';

const schema = z.object({
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

export default function RegisterPage() {
    const [isLoading, setisLoading] = useState(false)
    const [errMsg, setErrMsg] = useState("")
    const [sucssMsg, setsucssMsg] = useState("")

    const { handleSubmit, register, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            dateOfBirth: "",
            gender: ""
        },
        resolver: zodResolver(schema),
        mode: "onChange"
    });

    async function handleRegister(formData) {
        // setisLoading(true);
        const data = await registerApi(formData);
        setisLoading(false);
        if (data.error) {
            setErrMsg(data.error);
            set
        }
        else {
            setErrMsg("");
            setsucssMsg(data.message)
        }
        console.log(data);

    }

    return (
        <div className="max-w-xl py-10 mx-auto my-10 shadow-xl rounded-xl px-4">
            <form onSubmit={handleSubmit(handleRegister)} className="flex flex-col gap-6">
                <div className="flex flex-col gap-6">
                    <h1 className='text-center text-2xl font-bold text-gray-800'>Register</h1>

                    {/* Name Field */}
                    <div className="flex flex-col gap-1">
                        <Input
                            variant='bordered'
                            color="secondary"
                            label="Name"
                            type="text"
                            {...register('name')}
                            isInvalid={!!errors.name}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">{errors.name.message}</p>
                        )}
                    </div>

                    {/* Email Field */}
                    <div className="flex flex-col gap-1">
                        <Input
                            variant='bordered'
                            color="secondary"
                            label="Email"
                            type="email"
                            {...register('email')}
                            isInvalid={!!errors.email}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="flex flex-col gap-1">
                        <Input
                            variant='bordered'
                            color="secondary"
                            label="Password"
                            type="password"
                            {...register('password')}
                            isInvalid={!!errors.password}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Confirm Password Field */}
                    <div className="flex flex-col gap-1">
                        <Input
                            variant='bordered'
                            color="secondary"
                            label="Confirm Password"
                            type="password"
                            {...register('rePassword')}
                            isInvalid={!!errors.rePassword}
                        />
                        {errors.rePassword && (
                            <p className="text-red-500 text-sm">{errors.rePassword.message}</p>
                        )}
                    </div>

                    {/* Date of Birth Field */}
                    <div className="flex flex-col gap-1">
                        <Input
                            variant='bordered'
                            color="secondary"
                            label="Date of Birth"
                            type="date"
                            {...register('dateOfBirth')}
                            isInvalid={!!errors.dateOfBirth}
                        />
                        {errors.dateOfBirth && (
                            <p className="text-red-500 text-sm">{errors.dateOfBirth.message}</p>
                        )}
                    </div>

                    {/* Gender Select */}
                    <div className="flex flex-col gap-1">
                        <Select label="what is your gender?"  {...register('gender')}>
                            <SelectItem key={"male"}>Male</SelectItem>
                            <SelectItem key={"female"}>Female</SelectItem>
                        </Select>
                        {errors.gender && (
                            <p className="text-red-500 text-sm">{errors.gender.message}</p>
                        )}
                    </div>

                    <Button isLoading={isLoading} type='submit' variant='bordered' color="secondary">
                        Register
                    </Button>

                    {errMsg && <p className='text-sm bg-red-200 rounded-md p-2 text-red-800 text-center mt-0'>{errMsg}</p>}
                    {sucssMsg && <p className='text-sm bg-green-200 rounded-md p-2 text-green-800 text-center mt-0'>{sucssMsg}</p>}

                </div>
            </form>
        </div>
    );
}