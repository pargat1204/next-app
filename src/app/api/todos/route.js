import { NextResponse } from "next/server";
import { connectDb } from "@/helper/db";
import { Task } from "@/models/task";

connectDb();

// Get Users:
export async function GET(request) {
    try{
        const users = await Task.find().select("-password");
        return NextResponse.json(users);
    }
    catch(error){
        console.log(error);
        return NextResponse.json({
            message: "failed to get users",
            success: false
        });
    }
}

// Create User:
export async function POST(request) {
    const { name, email, password, about, profileURL } = await request.json();
    const user = new User({ name, email, password, about, profileURL });
    try {
        // Save the object to database:
        const createdUser = await user.save();
        const  response = NextResponse.json(user, {
            status: 201
        });
        return response;
    }
    catch (error) {
        return NextResponse.json({
            message: "failed to create user!",
            status: false
        })
    }

}