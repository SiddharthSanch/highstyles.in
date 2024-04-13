import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

export async function GET() {
    try {
        const { count, error: countError } = await supabase
            .from('Products')
            .select('*', { count: 'exact' });
        if (countError) {
            console.error(countError);
            return new NextResponse('Something went wrong', { status: 400 });
        }
        const skip = Math.floor(Math.random() * count);
        const { data: products, error: productsError } = await supabase
            .from('Products')
            .select('*')
            .order('id', { ascending: true })
            .range(skip, skip + 5);

        if (productsError) {
            console.error(productsError);
            return new NextResponse('Something went wrong', { status: 400 });
        }

        return NextResponse.json(products);
    } catch (error) {
        console.error(error);
        return new NextResponse('Something went wrong', { status: 400 });
    }
}
