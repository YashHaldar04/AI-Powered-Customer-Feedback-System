# AI-Powered Customer Feedback System

This project was built as part of the **Fynd AI Intern – Take Home Assessment (Task 2)**.

The goal of this task was to design and deploy a production-style web application that collects customer feedback, processes it using an LLM, and provides actionable insights through an admin dashboard.

---

## 🚀 Live Demo

- **User Dashboard:** https://<your-vercel-url>.vercel.app  
- **Admin Dashboard:** https://<your-vercel-url>.vercel.app/admin  

> The admin dashboard auto-refreshes to reflect new submissions and analytics.

---

## 🧠 What This System Does

### User Flow
- Users submit a star rating (1–5) and a written review
- An AI-generated response is shown immediately after submission
- Feedback is stored persistently via the backend

### Admin Flow
- Admins can view all submitted reviews
- Each entry includes:
  - User rating and review
  - AI-generated summary
  - AI-recommended next action
- An analytics section provides:
  - Total review count
  - Rating distribution (1★–5★)
  - Sentiment overview (positive / neutral / negative)
- An AI Insights panel highlights high-level trends

---

## 🤖 LLM Usage

- **Model:** Google Gemini 1.5 Flash  
- **Usage:** Server-side only (API routes)
- **Purpose:**
  - Generate customer-facing responses
  - Create internal summaries for admins
  - Suggest recommended business actions
- **Reliability:**
  - Defensive JSON parsing is used
  - Graceful fallback responses are implemented in case of LLM failure

---

## 🏗️ Architecture Overview

- **Frontend:** Next.js (App Router)
- **Backend:** Next.js API Routes
- **Database:** Supabase (PostgreSQL)
- **LLM Integration:** Google Gemini API
- **Styling:** Tailwind CSS
- **Deployment:** Vercel

The frontend, backend, and LLM logic are cleanly separated, with all LLM calls handled securely on the server.

---

## 🗄️ Database Design

A single `reviews` table is used with the following fields:
- rating
- review
- ai_response
- ai_summary
- ai_action
- created_at

Row Level Security (RLS) is enabled.  
For simplicity in this assessment, public read/write policies are used; in production, this would be restricted via authentication.

---

## 📊 Analytics & Insights

The admin dashboard includes lightweight but meaningful analytics:
- Rating distribution with progress-style bars
- Sentiment breakdown based on ratings
- Automated AI insights derived from recent feedback

These features were added to reflect how internal teams might actually consume feedback data.

---

## 🧪 Error Handling & Edge Cases

- Empty or invalid inputs are rejected
- Long reviews are constrained
- LLM failures are handled gracefully
- Backend returns structured JSON responses with clear error states

---

## 📝 Notes

- The system was designed with simplicity, clarity, and robustness in mind
- Emphasis was placed on clean architecture, reproducibility, and realistic product behavior rather than over-engineering
- Both dashboards are fully deployed and publicly accessible

---

## 📂 Related Work

- **Task 1:** Prompt-based Yelp rating prediction (included separately in the repository)
