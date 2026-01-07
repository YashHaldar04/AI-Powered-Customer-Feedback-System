import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { runLLM } from "@/lib/llm";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { rating, review } = body;

    // Validation
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Invalid rating" },
        { status: 400 }
      );
    }

    if (!review || review.trim().length === 0) {
      return NextResponse.json(
        { error: "Review cannot be empty" },
        { status: 400 }
      );
    }

    if (review.length > 1000) {
      return NextResponse.json(
        { error: "Review too long" },
        { status: 400 }
      );
    }

    // Run LLM (mock)
    const llmResult = await runLLM(review, rating);

    // Insert into database
    const { error } = await supabase.from("reviews").insert({
      rating,
      review,
      ai_response: llmResult.ai_response,
      ai_summary: llmResult.ai_summary,
      ai_action: llmResult.ai_action
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Database error" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      ai_response: llmResult.ai_response
    });
  } catch (err) {
    console.error("Submit review error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
