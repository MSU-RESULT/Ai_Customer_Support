import { scalekit } from "@/lib/scalekit";
import { scale } from "motion";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function GET (req:Request){

  const cookieStore =  await cookies()
  cookieStore.delete("access_token")
  return NextResponse.redirect(`${ process.env.NEXT_PUBLIC_APP_URL}`)

}  