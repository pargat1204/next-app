'use client'
import { useState } from 'react';
import loginSvg from '../../assets/loginSvg.svg';
import Image from 'next/image';
import { addTask } from '@/services/taskServices';
import { toast } from 'react-toastify';

const AddTask = () => {
    const [task, setTask] = useState({
        title: '',
        content: '',
        status: 'none',
        userId: '65c462ff81524e9120c4b6de'
    })

    const clearFilled = () => {
        setTask({
            ...task,
            title: '',
            content: '',
            status: 'none'
        });
    };

    const handleAddTask = async (e) => { 
        e.preventDefault();

        // validate task data:

        try{
            const result = await addTask(task);
            console.log(result);
            toast.success("Your Task is Added!!", {
                position: "top-center"
            });
            clearFilled();
        }
        catch(error){
            console.log(error);
            toast.error("Task not Added!!", {
                position: "top-center"
            });
        }
    };

    return (
        <div className="grid grid-cols-12">
            <div className="col-span-4 col-start-5">
                <div className='my-8 flex justify-center'>
                    <Image alt='login_svg' src={loginSvg} style={{
                        width: '40%'
                    }} />
                </div>
                <h1 className="text-3xl text-center">Add your task here</h1>
                <form action='#' onSubmit={handleAddTask}>
                    {/* Title */}
                    <div className="mt-4">
                        <label htmlFor="task_title" className="block text-sm font-medium mb-2">Title</label>
                        <input type="text" className="w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400 border border-gray-400" id="task_title" name='task_title' onChange={(e) => { setTask({ ...task, title: e.target.value }) }} value={task.title}/>
                    </div>
                    {/* Content */}
                    <div className="mt-4">
                        <label htmlFor="task_content" className="block text-sm font-medium mb-2">Content</label>
                        <textarea type="text" className="w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400 border border-gray-400" id="task_content" rows={4} name='task_content' onChange={(e) => { setTask({ ...task, content: e.target.value }) }} value={task.content}/>
                    </div>
                    {/* Status */}
                    <div className="mt-4">
                        <label htmlFor="task_status" className="block text-sm font-medium mb-2">Status</label>
                        <select type="text" className="w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400 border border-gray-400" id="task_status" name='task_status' onChange={(e) => { setTask({ ...task, status: e.target.value }) }} value={task.status}>
                            <option value="none">---Select Status---</option>
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    {/* Action Buttons */}
                    <div className="mt-4 flex justify-center">
                        <button className="bg-[royalblue] px-3 py-2 rounded-lg hover:bg-blue-800">Add Task</button>
                        <button className="bg-red-600 px-3 py-2 rounded-lg hover:bg-red-800 ms-3" onClick={()=>clearFilled()}>Clear</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddTask;