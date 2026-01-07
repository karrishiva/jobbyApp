import { NextResponse } from "next/server";


export async function POST() {
    const response = NextResponse.json({ message: "Logged out successfully" });
    response.cookies.set("jwt_token", "", {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 0,
        path: "/",
    });
    return response;
}