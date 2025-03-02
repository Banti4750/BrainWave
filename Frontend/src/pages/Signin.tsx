import React, { useState, FormEvent } from 'react';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const Signin: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const signup = async (event: FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://brainwave-jibt.onrender.com/api/v1/signin', {

                email: email,
                password: password
            });
            localStorage.setItem('token', response.data.token);

            if (response.data.message === "User created successfully") {
                alert("Sign in Successful");
            }

            // Uncomment if you want to navigate after signup
            navigate('/dashboard');
        } catch (error: any) {
            console.error('Error:', error.response?.data || error.message);
            alert("Sign in Failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="w-full max-w-md px-6 py-12 bg-gray-800 rounded-lg shadow-lg">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
                        Login
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6">
                        <div className="group">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                                Email
                            </label>
                            <div className="mt-2 relative">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="block w-full rounded-lg bg-gray-800 px-4 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 transform transition-all duration-200 ease-in-out hover:ring-2 hover:ring-indigo-500/50 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    required
                                    className="block w-full rounded-lg bg-gray-800 px-4 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 transform transition-all duration-200 ease-in-out hover:ring-2 hover:ring-indigo-500/50 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"

                                className="relative flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 transform transition-all duration-200 ease-in-out hover:scale-[1.02] active:scale-[0.98]"
                                onClick={signup}
                            >

                                Sign in

                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-400">
                        Dont't have an account?{' '}
                        <a
                            href="/signup"
                            className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
                        >
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signin;