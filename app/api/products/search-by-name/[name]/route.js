import { supabase } from "@/utils/supabase";
import { NextResponse } from "next/server";

export async function GET(req, context) {
    try {
        const { name } = context.params;

        // Fetch items from Supabase
        const { data: items, error } = await supabase
            .from('Products')
            .select('*')
            .ilike('title', `%${name}%`)
            .limit(5)
            .execute();

        if (error) {
            console.error(error);
            return new NextResponse('Something went wrong', { status: 400 });
        }

        return NextResponse.json(items);
    } catch (error) {
        console.error(error);
        return new NextResponse('Something went wrong', { status: 400 });
    }
}
