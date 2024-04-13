import { createClient } from "@supabase/supabase-js";
const url = "https://svtbcpbalgdlzpnhhdsi.supabase.co";
const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2dGJjcGJhbGdkbHpwbmhoZHNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY2MTE4ODEsImV4cCI6MjAyMjE4Nzg4MX0.UNJW2RavD55Z8u8t-kz4GsI75A1OlIs4eImFqYDDzYY";
export const supabase = createClient(url, key);