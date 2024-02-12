import { NextResponse } from "next/server";
import { connectDb } from "@/helper/db";
import { Task } from "@/models/task";

connectDb();

// Get Tasks:
export async function GET(request) {
    try {
        const tasks = await Task.find();
        return NextResponse.json(tasks);
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "failed to get tasks",
            success: false
        });
    }
}

// Create Task:
export async function POST(request) {
    const { title, content, status, userId } = await request.json();
    const task = new Task({ title, content, status, userId });
    try {
        // Save the object to database:
        await task.save();
        return NextResponse.json(task, {
            message: "task is created!",
            status: 201
        });
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "failed to create task!",
            status: false
        })
    }

}

