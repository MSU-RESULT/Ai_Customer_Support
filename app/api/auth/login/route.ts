import { scalekit } from "@/lib/scalekit";
import { scale } from "motion";
import { NextRequest, NextResponse } from "next/server";


export async function GET (req:Request){

    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`

    const url = scalekit.getAuthorizationUrl(redirectUri)
    console.log(url)

    return NextResponse.redirect(url)

}  