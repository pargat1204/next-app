'use client'
import { useState } from 'react';
import loginSvg from '../../assets/loginSvg.svg';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { addUser } from '@/services/userServices';

const Signup = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        about: '',
        profileURL: 'profile_url_here'
    });

    const clearFilled = () => {
        setUser({
            ...user,
            name: '',
            email: '',
            password: '',
            about: ''
        });
    };

    const handleAddUser = async (e) => { 
        e.preventDefault();

        // validate task data:
        if(user.name.trim() === "" || user.name == null){
            toast.warning("Name is required !!!", {
                position: "top-center"
            });
            return;
        }

        // rest validation todo:

        try{
            const result = await addUser(user);
            console.log(result);
            toast.success("User is Added!!", {
                position: "top-center"
            });
            clearFilled();
        }
        catch(error){
            console.log(error);
            toast.error("Signup Error!!" + error.response.data.message, {
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
                    <h1 className="text-3xl text-center">Signup Here</h1>
                    <form className="mt-5" onSubmit={handleAddUser}>
                        {/* Name */}
                        <div className="mt-3">
                            <label htmlFor="user_name" className="block text-sm font-medium mb-2 ps-3">Username</label>
                            <input name='name' type="text" className="w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400 border border-gray-400" placeholder="Enter here" id="user_name" onChange={(e) => { setUser({ ...user, name: e.target.value }) }} value={user.name} />
                        </div>
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
                        {/* User About */}
                        <div className="mt-3">
                            <label htmlFor="user_about" className="block text-sm font-medium mb-2 ps-3">About</label>
                            <textarea name='about' rows={6} type="text" className="w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400 border border-gray-400" placeholder="Enter here" id="user_about" onChange={(e) => { setUser({ ...user, about: e.target.value }) }} value={user.about} ></textarea>
                        </div>
                        {/* Action Buttons */}
                        <div className="mt-4 flex justify-center">
                            <button className="bg-green-600 px-3 py-2 rounded-lg hover:bg-blue-800">Signup</button>
                            <button className="bg-red-600 px-3 py-2 rounded-lg hover:bg-red-800 ms-3" onClick={() => clearFilled()}>Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;