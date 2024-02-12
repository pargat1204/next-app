'use client';
import { useState } from 'react';
import loginSvg from '../../assets/loginSvg.svg';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { login } from '@/services/userServices';
import { useRouter } from 'next/navigation';

const Login = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const clearFilled = () => {
        setUser({
            email: '',
            password: ''
        });
    };

    const handleLogin = async (e) => { 
        e.preventDefault();

        // validate task data:
        if(user.email.trim() === "" || user.email == null){
            toast.warning("Email is required !!!", {
                position: "top-center"
            });
            return;
        }

        if(user.password.trim() === "" || user.password == null){
            toast.warning("Password is required !!!", {
                position: "top-center"
            });
            return;
        }

        try{
            const result = await login(user);
            console.log(result);
            toast.success("Login Successfull !!", {
                position: "top-center"
            });
            
            // redirect:
            router.push("/profile/user");
        }
        catch(error){
            console.log(error);
            toast.error(error.response.data.message, {
                position: "top-center"
            });
        }
    };

    return (
        <div className="grid grid-cols-12">
            <div className="col-span-4 col-start-5">
                <div className="py-5">
                    <div className='m-5 flex justify-center'>
                        <Image alt='login_svg' src={loginSvg} style={{
                            width: '40%'
                        }} />
                    </div>
                    <h1 className="text-3xl text-center">Login Here</h1>
                    <form className="mt-5" onSubmit={handleLogin}>
                        {/* Email */}
                        <div className="mt-3">
                            <label htmlFor="user_email" className="block text-sm font-medium mb-2 ps-3">Email</label>
                            <input name='email' type="email" className="w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400 border border-gray-400" placeholder="Enter here" id="user_email" onChange={(e) => { setUser({ ...user, email: e.target.value }) }} value={user.email} />
                        </div>
                        {/* Password */}
                        <div className="mt-3">
                            <label htmlFor="user_password" className="block text-sm font-medium mb-2 ps-3">Password</label>
                            <input name='password' type="password" className="w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400 border border-gray-400" placeholder="Enter here" id="user_password" onChange={(e) => { setUser({ ...user, password: e.target.value }) }} value={user.password} />
                        </div>
                        {/* Action Buttons */}
                        <div className="mt-4 flex justify-center">
                            <button className="bg-green-600 px-3 py-2 rounded-lg hover:bg-blue-800">Login</button>
                            <button className="bg-red-600 px-3 py-2 rounded-lg hover:bg-red-800 ms-3" onClick={() => clearFilled()}>Reset</button>
                        </div>
                    </form>
                    {/* {JSON.stringify(user)} */}
                </div>
            </div>
        </div>
    );
}

export default Login;