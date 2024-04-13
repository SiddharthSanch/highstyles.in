import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

export async function GET(req, context) {
    try {
        const { id } = context.params;

        // Fetch product from Supabase
        const { data: product, error } = await supabase
            .from('Products')
            .select('*')
            .eq('id', Number(id))
            .single();

        if (error) {
            console.error(error);
            return new NextResponse('Something went wrong', { status: 400 });
        }

        return NextResponse.json(product);
    } catch (error) {
        console.error(error);
        return new NextResponse('Something went wrong', { status: 400 });
    }
}
