import { Button, Input, Select, SelectItem } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { set, z } from 'zod';
import { LoginApi } from '../services/authservices';
import { loginschema } from '../schema/LoginSchema';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../contexts/AuthContext';

export default function LoginPage() {
    const [isLoading, setisLoading] = useState(false)
    const [errMsg, setErrMsg] = useState("")
    const [sucssMsg, setsucssMsg] = useState("")
    const Navigate = useNavigate();
    const { setIsLoggedIn } = useContext(authContext);

    const { handleSubmit, register, formState: { errors } } = useForm({
        defaultValues: {
            email: "sa9899006@gmail.com",
            password: "shikoshikoW123#",
        },
        resolver: zodResolver(loginschema),
        mode: "onSubmit"
    });

    async function handleLogin(formData) {
        setisLoading(true);
        const data = await LoginApi(formData);
        setisLoading(false);

        if (data.error) {
            setErrMsg(data.error);
        }
        else {

            setsucssMsg(data.message)
            
            localStorage.setItem("token",data.token)
            setIsLoggedIn(true);

            Navigate('/')
        }
        console.log(data);

    }

    return (
        <div className="max-w-xl py-10 mx-auto my-10 shadow-xl rounded-xl px-4">
            <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-6">
                <div className="flex flex-col gap-6">
                    <h1 className='text-center text-2xl font-bold text-gray-800'>Login</h1>

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

                    <Button isLoading={isLoading} type='submit' variant='bordered' color="secondary">
                        Login
                    </Button>

                    <p>U don't have an account? <Link to={"/register"} className="text-primary-500">create account now!</Link ></p>

                    {errMsg && <p className='text-sm bg-red-200 rounded-md p-2 text-red-800 text-center mt-0'>{errMsg}</p>}
                    {sucssMsg && <p className='text-sm bg-green-200 rounded-md p-2 text-green-800 text-center mt-0'>{sucssMsg}</p>}

                </div>
            </form>
        </div>
    );
}