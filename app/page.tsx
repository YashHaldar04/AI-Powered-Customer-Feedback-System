"use client";

import { useState } from "react";

export default function Home() {
  const [rating, setRating] = useState<number>(5);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setAiResponse(null);

    try {
      const res = await fetch("/api/submit-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, review })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setAiResponse(data.ai_response);
      setReview("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 relative overflow-hidden flex items-center justify-center px-4">
      {/* Background decoration */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100 rounded-full opacity-40 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-100 rounded-full opacity-40 blur-3xl" />

      <div className="relative z-10 w-full max-w-lg">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
            Share your experience
          </h1>
          <p className="text-sm text-gray-600 mb-6 text-center">
            Your feedback helps us improve products and services.
          </p>

          {/* Rating */}
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rating
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full rounded-md border border-gray-300 px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {[1, 2, 3, 4, 5].map((r) => (
              <option key={r} value={r}>
                {r} Star{r > 1 && "s"}
              </option>
            ))}
          </select></label>

          {/* Review */}
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Review
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows={4}
            placeholder="Tell us what went well or what could be improved..."
            className="w-full rounded-md border border-gray-300 px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          /></label>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit feedback"}
          </button>

          {/* AI Response */}
          {aiResponse && (
            <div className="mt-6 rounded-md border border-green-200 bg-green-50 p-4">
              <p className="text-sm font-medium text-green-800 mb-1">
                AI Response
              </p>
              <p className="text-sm text-green-700">{aiResponse}</p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-6 rounded-md border border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
        </div>

        {/* Why feedback matters */}
        <p className="mt-6 text-xs text-gray-500 text-center max-w-md mx-auto">
          Your feedback is reviewed by our internal team and used to improve
          customer experience across products and services.
        </p>
      </div>

      {/* Footer hint */}
      <p className="absolute bottom-4 text-xs text-gray-400">
        Powered by AI-assisted feedback analysis
      </p>
    </main>
  );
}
