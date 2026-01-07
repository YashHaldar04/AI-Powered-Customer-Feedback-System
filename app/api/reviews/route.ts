import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
        console.error("SUPABASE ERROR:", error);
        return NextResponse.json(
          { error: error.message },
          { status: 500 }
        );
    }
      

    // Analytics
    const total = data.length;
    const averageRating =
      total === 0
        ? 0
        : data.reduce((sum, r) => sum + r.rating, 0) / total;

    const countByRating: Record<number, number> = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0
    };

    data.forEach((r) => {
      countByRating[r.rating]++;
    });

    return NextResponse.json({
      reviews: data,
      analytics: {
        total_reviews: total,
        average_rating: Number(averageRating.toFixed(2)),
        count_by_rating: countByRating
      }
    });
  } catch (err) {
    console.error("Fetch reviews error:", err);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}
