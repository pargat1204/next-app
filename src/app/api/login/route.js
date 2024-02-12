import { User } from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {
    const { email, password } = await request.json();
    try {

        // 1. get user:
        const user = await User.findOne({
            email: email
        });
        if(user==null){
            throw new Error("user not found");
        }

        // 2. password check:
        const matched = bcrypt.compareSync(password, user.password);
        if(!matched){
            throw new Error("password not match");
        }

        // 3. generate token:
        const token = jwt.sign({
            _id: user._id,
            name: user.name
        }, 'dtrdtrdtrxx');

        // 4. create nextresponse -- cookie:
        const response = NextResponse.json({
            message: "Login successful",
            success: true
        });
        response.cookies.set("authToken", token, {
            expiresIn: "1d",
            httpOnly: true
        });
        return response;
    }
    catch (error) {
        return NextResponse(
            {
                message: error.message,
                success: false,
            },
            {
                status: 500
            }
        );
    }
}