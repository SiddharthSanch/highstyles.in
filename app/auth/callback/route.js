import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  console.log(request)
  const requestUrl = new URL(request.url);
  console.log(requestUrl)
  const code = requestUrl.searchParams.get("code");

  console.log(requestUrl.origin, code);

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin);
}
