import { NextResponse } from "next/server";
import { connectDb } from "@/helper/db";
import { Task } from "@/models/task";

connectDb();

// Get Single Task:
export async function GET(request, { params }) {
    const { taskId } = params;
    try {
        const task = await Task.findById(taskId);
        return NextResponse.json(task);
    }
    catch (error) {
        return NextResponse.json({
            message: "error in finding task",
            success: false
        })
    }
}

// Delete Task:
export async function DELETE(request, { params }) {
    const { taskId } = params;
    try {
        await Task.deletOne({
            _id: taskId
        })
        return NextResponse.json({
            message: "Task deleted successfully",
            success: true
        })
    }
    catch (error) {
        return NextResponse.json({
            message: "error in deleting task",
            success: false
        })
    }
}

// Update Task:
export async function PUT(request, { params }) {
    const { taskId } = params;
    const { title, content, status } = await request.json();
    try {
        const task = await Task.findById(taskId);

        task.title = title;
        task.content = content;
        task.status = status;

        const updatedTask = await task.save();

        return NextResponse.json(updatedTask);
    }
    catch (error) {
        return NextResponse.json({
            message: "error in updating task",
            success: false
        })
    }
}