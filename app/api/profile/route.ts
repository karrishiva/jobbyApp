import { NextResponse, NextRequest } from "next/server";
export async function GET(req: NextRequest): Promise<NextResponse> {

    try {
        const res = fetch('https://apis.ccbp.in/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${req.cookies.get('jwt_token')?.value}`
            }
        });
        const data = await (await res).json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching profile:", error);
        return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
    }


}