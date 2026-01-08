import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
    const { searchParams } = new URL(req.url);
    const employmentType = searchParams.get('employment_type');
    const minimumPackage = searchParams.get('minimum_package');
    const searchQuery = searchParams.get('search');

    try {
        const res = fetch(`https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${minimumPackage}&search=${searchQuery}`, {
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