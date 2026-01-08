import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { jobId: string } }): Promise<NextResponse> {
    const jobId = params.jobId;
    try {
        const res = fetch(`https://apis.ccbp.in/jobs/${jobId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${req.cookies.get('jwt_token')?.value}`
            }
        });
        const data = await (await res).json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching job details:", error);
        return NextResponse.json({ error: "Failed to fetch job details" }, { status: 500 });
    }
}