import { Button, Input, Select, SelectItem } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { set, z } from 'zod';
import { registerApi } from '../services/authservices';
import { registerschema } from '../schema/RegisterSchema';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
    const [isLoading, setisLoading] = useState(false)
    const [errMsg, setErrMsg] = useState("")
    const navigate = useNavigate();


    const { handleSubmit, register, formState: { errors }, reset } = useForm({
        defaultValues: {
            name: "Alsherif",
            email: "sa9899006@gmail.com",
            password: "shikoshikoW123#",
            rePassword: "shikoshikoW123#",
            dateOfBirth: "09/26/2000",
            gender: ""
        },
        resolver: zodResolver(registerschema),
        mode: "onSubmit"
    });

    async function handleRegister(formData) {
        // setisLoading(true);
        const data = await registerApi(formData);
        setisLoading(false);
        if (data.error) {
            setErrMsg(data.error);
        }
        else {
            setErrMsg("");
            setTimeout(() => {
                navigate('/login')
            }, 700);
        }

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
                </div>
            </form>
        </div>
    );
}