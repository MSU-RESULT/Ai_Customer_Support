import connectDb from "@/lib/db";
import Settings from "@/model/settings.model";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

function addCorsHeaders(response: NextResponse) {
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return response;
}

export async function OPTIONS() {
    return addCorsHeaders(new NextResponse(null, { status: 204 }));
}

export async function POST(req: NextRequest) {
    try {
        const { message, ownerId } = await req.json();

        if (!message || !ownerId) {
            return addCorsHeaders(NextResponse.json({ message: "Data missing" }, { status: 400 }));
        }

        await connectDb();
        const setting = await Settings.findOne({ ownerId });

        if (!setting) {
            return addCorsHeaders(NextResponse.json({ message: "Bot not set up" }, { status: 400 }));
        }

        // Safety check to prevent crashing if .env isn't loaded properly
        if (!process.env.GEMINI_API_KEY) {
             console.error("Missing GEMINI_API_KEY in environment variables");
             return addCorsHeaders(NextResponse.json({ message: "Server configuration error" }, { status: 500 }));
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        
        // Use the standard, stable model string
        let model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

        // Removed excess indentation to save tokens and keep the prompt clean
        const prompt = `Context: ${setting.knowledge || "General support"}
Business: ${setting.businessName || "Our Shop"}
User: ${message}
Answer concisely:`;

        let result;
        try {
            result = await model.generateContent(prompt);
        } catch (error: any) {
            // If Flash fails with a 404, fallback to Pro
            if (error.message?.includes("404") || error.message?.includes("not found")) {
                console.log("Flash 404, falling back to gemini-1.5-pro...");
                model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
                result = await model.generateContent(prompt);
            } else {
                throw error; // If it's a 403 or 500, throw it to the outer catch block
            }
        }

        const response = await result.response;
        return addCorsHeaders(NextResponse.json(response.text()));

    } catch (error: any) {
        console.error("Final Chat Error:", error);
        return addCorsHeaders(NextResponse.json(
            { message: "AI is briefly unavailable. Please try again." }, 
            { status: 500 }
        ));
    }
}