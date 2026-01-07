import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { LoginDetails } from "@/app/types/userDetails";

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const loginDetails: LoginDetails = await request.json();

        const response = await fetch("https://apis.ccbp.in/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginDetails),
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(data, { status: response.status });
        }

        const jwtToken = data.jwt_token;

        const cookieStore = await cookies();
        cookieStore.set("jwt_token", jwtToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24,
        });


        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
