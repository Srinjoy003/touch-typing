import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){

}

export async function POST(request: NextRequest){
    console.log(request.body)
    return new Response(JSON.stringify(request), {status: 401});
    
}

export function Yo(request: NextRequest){
    console.log(request.body)
    
}