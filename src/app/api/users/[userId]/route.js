import { NextResponse } from "next/server";
import { connectDb } from "@/helper/db";
import { User } from "@/models/user";

connectDb();

// Get Single User:
export async function GET(request, { params }) {
    const { userId } = params;
    try {
        const user = await User.findById(userId).select("-password");
        return NextResponse.json(user);
    }
    catch (error) {
        return NextResponse.json({
            message: "error in finding user",
            success: false
        })
    }
}

// Delete User:
export async function DELETE(request, { params }) {
    const { userId } = params;
    try {
        await User.deletOne({
            _id: userId
        })
        return NextResponse.json({
            message: "User deleted successfully",
            success: true
        })
    }
    catch (error) {
        return NextResponse.json({
            message: "error in deleting user",
            success: false
        })
    }
}

// Update User:
export async function PUT(request, { params }) {
    const { userId } = params;
    const { name, password, about, profileURL } = await request.json();
    try {
        const user = await User.findById(userId);

        user.name = name;
        user.password = password;
        user.about = about;
        user.profileURL = profileURL

        const updatedUser = await user.save();

        return NextResponse.json(updatedUser);
    }
    catch (error) {
        return NextResponse.json({
            message: "error in updating user",
            success: false
        })
    }
}