import { supabase } from "@/utils/supabase";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const { data: products, error } = await supabase.from('Products').select('*').order('id', { ascending: true })
        ;
        if (error) {
            console.error(error);
            return new NextResponse('Something went wrong', { status: 400 });
        }
        return NextResponse.json(products);
    } catch (error) {
        console.error(error);
        return new NextResponse('Something went wrong', { status: 400 });
    }
}
