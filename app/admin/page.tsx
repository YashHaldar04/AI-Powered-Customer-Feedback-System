"use client";

import { useEffect, useState } from "react";

type Review = {
  id: string;
  rating: number;
  review: string;
  ai_summary: string;
  ai_action: string;
  created_at: string;
};

export default function AdminPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const res = await fetch("/api/reviews");
    const data = await res.json();
    setReviews(data.reviews);
    setAnalytics(data.analytics);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <p className="p-6">Loading admin dashboard...</p>;
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Admin Dashboard
      </h1>

      {/* Sentiment Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <InsightCard
          label="Positive Reviews"
          value={reviews.filter((r) => r.rating >= 4).length}
          hint="4★ and above"
        />
        <InsightCard
          label="Neutral Reviews"
          value={reviews.filter((r) => r.rating === 3).length}
          hint="3★ ratings"
        />
        <InsightCard
          label="Negative Reviews"
          value={reviews.filter((r) => r.rating <= 2).length}
          hint="1★–2★ ratings"
        />
      </div>

      {/* Ratings Overview */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">
          Ratings Overview
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Total Reviews: {analytics.total_reviews}
        </p>

        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = analytics.count_by_rating[star];
            const percentage =
              analytics.total_reviews === 0
                ? 0
                : (count / analytics.total_reviews) * 100;

            return (
              <div key={star} className="flex items-center gap-3">
                <span className="w-8 text-sm font-medium text-gray-700">
                  {star}★
                </span>

                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <span className="w-8 text-sm text-gray-700 text-right">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          AI Insights
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Automated insights based on recent customer feedback.
        </p>

        <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
          <li>
            {reviews.filter((r) => r.rating <= 2).length > 0
              ? "Some customers reported negative experiences that may require follow-up."
              : "No major negative feedback detected recently."}
          </li>
          <li>
            {reviews.filter((r) => r.rating >= 4).length >
            reviews.length / 2
              ? "Overall customer sentiment is largely positive."
              : "Customer sentiment is mixed and could be improved."}
          </li>
          <li>
            Feedback themes suggest opportunities for operational refinement.
          </li>
        </ul>
      </div>

      {/* Reviews Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Rating</th>
              <th className="px-4 py-3 text-left">Review</th>
              <th className="px-4 py-3 text-left">AI Summary</th>
              <th className="px-4 py-3 text-left">AI Action</th>
              <th className="px-4 py-3 text-left">Time</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((r) => (
              <tr key={r.id} className="border-t even:bg-gray-50">
                <td className="px-4 py-3 font-semibold text-gray-900">
                  {r.rating}★
                </td>
                <td className="px-4 py-3 text-gray-700">{r.review}</td>
                <td className="px-4 py-3 text-gray-700">{r.ai_summary}</td>
                <td className="px-4 py-3 text-gray-700">{r.ai_action}</td>
                <td className="px-4 py-3 text-xs text-gray-500">
                  {new Date(r.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

function InsightCard({
  label,
  value,
  hint
}: {
  label: string;
  value: number;
  hint: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
      <p className="text-xs text-gray-400 mt-1">{hint}</p>
    </div>
  );
}
