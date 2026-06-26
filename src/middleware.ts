import { auth } from "@/bff/v1/auth"
import { NextResponse } from "next/server"

export const middleware = auth((req) => {
  if (!req.auth) {
    const signInUrl = new URL("/sign-in", req.url)
    return NextResponse.redirect(signInUrl)
  }
})

export const config = {
  matcher: ["/(protected)/:path*"],
}
