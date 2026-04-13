import { scalekit } from "@/lib/scalekit"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const code = searchParams.get('code')
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`
    
    if (!code) {
        return NextResponse.json({ message: 'Code is not Found' }, { status: 400 })
    }

    try {
        // We wrap this in a try/catch because network requests and single-use codes can fail
        const session = await scalekit.authenticateWithCode(code, redirectUri)
        
        console.log("Authentication successful, session:", session)

        // Ensure NEXT_PUBLIC_APP_URL is defined, otherwise fallback to localhost
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
        const response = NextResponse.redirect(baseUrl)

        response.cookies.set('access_token', session.accessToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24,
            secure: process.env.NODE_ENV === 'production', // Better practice: only true in prod
            path: '/'
        })
      
        return response

    } catch (error) {
        // This will catch the EXACT reason it's failing
        console.error("Scalekit Authentication Error:", error)
        
        // Redirect the user to an error page or login page instead of giving them a raw 500 page
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/?error=auth_failed`)
    }
}