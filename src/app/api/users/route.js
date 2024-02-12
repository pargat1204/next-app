import { NextResponse } from "next/server";
import { connectDb } from "@/helper/db";
import { User } from "@/models/user";
import bcrypt from "bcryptjs";

connectDb();

// Get Users:
export async function GET(request) {
    try{
        const users = await User.find().select("-password");
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

    // Password Hasing:
    user.password = bcrypt.hashSync(user.password, 10);

    try {
        // Save the object to database:
        await user.save();
        return NextResponse.json(user, {
            status: 201
        });
    }
    catch (error) {
        return NextResponse.json({
            message: "failed to create user!",
            status: false
        })
    }

}

