# AI-Powered Customer Feedback System

This project was built as part of the **Fynd AI Intern – Take Home Assessment (Task 2)**.

The objective of this task was to design and deploy a production-style web application that collects customer feedback, processes it using an LLM, and provides actionable insights through an admin dashboard.

---

## 🌐 Live URLs

- **User Dashboard:**  
  👉 <[PASTE USER PAGE URL HERE](https://ai-powered-customer-feedback-system.vercel.app/)>

- **Admin Dashboard:**  
  👉 <[PASTE ADMIN PAGE URL HERE](https://ai-powered-customer-feedback-system.vercel.app/admin)>

> The admin dashboard refreshes to reflect new submissions and updated analytics.

---

## 📍 Codebase Structure & Locations

Below is a quick guide to where each major part of the system is implemented:

### User Dashboard
- **Path:** `app/page.tsx`
- **Description:**  
  User-facing interface where customers:
  - Select a rating (1–5)
  - Submit a written review
  - Receive an AI-generated response after submission

---

### Admin Dashboard
- **Path:** `app/admin/page.tsx`
- **Description:**  
  Internal dashboard for administrators showing:
  - All submitted reviews
  - AI-generated summaries and recommended actions
  - Rating distribution and sentiment analytics
  - AI-derived insights from recent feedback

---

### Backend APIs
- **Submit Review API:**  
  - **Path:** `app/api/submit-review/route.ts`
  - Handles validation, LLM processing, and database insertion

- **Fetch Reviews & Analytics API:**  
  - **Path:** `app/api/reviews/route.ts`
  - Returns stored reviews along with aggregated analytics

---

### LLM Integration
- **Path:** `lib/llm.ts`
- **Description:**  
  - Server-side integration with **Google Gemini 1.5 Flash**
  - Generates:
    - Customer-facing AI response
    - Internal AI summary
    - Recommended business action
  - Includes defensive JSON parsing and graceful fallback handling

---

### Supabase Client & Database
- **Path:** `lib/supabase.ts`
- **Description:**  
  - Supabase PostgreSQL client setup
  - Used for persistent storage of all feedback and AI outputs
  - Row Level Security (RLS) enabled

---

## 🧠 What This System Does

### User Flow
- Users submit a star rating and written feedback
- An AI-generated response is displayed immediately
- Feedback is stored persistently in the database

### Admin Flow
- Admins can view all feedback entries
- Each entry includes:
  - Original user review
  - AI-generated summary
  - AI-recommended next action
- Analytics provide a quick overview of sentiment and trends

---

## 🤖 LLM Usage

- **Model:** Google Gemini 1.5 Flash
- **Usage:** Server-side only (via API routes)
- **Purpose:**
  - Generate polite customer responses
  - Summarize feedback for internal review
  - Suggest actionable improvements
- **Reliability Measures:**
  - Defensive extraction of JSON from LLM responses
  - Context-aware fallback responses in case of LLM failure

---

## 🏗️ Architecture Overview

- **Frontend:** Next.js (App Router)
- **Backend:** Next.js API Routes
- **Database:** Supabase (PostgreSQL)
- **LLM Integration:** Google Gemini API
- **Styling:** Tailwind CSS
- **Deployment:** Vercel

The system is designed with a clear separation between UI, backend logic, LLM processing, and persistence.

---

## 🗄️ Database Design

A single `reviews` table is used with the following fields:
- `rating`
- `review`
- `ai_response`
- `ai_summary`
- `ai_action`
- `created_at`

Row Level Security (RLS) is enabled.  
For simplicity in this assessment, public read/write access is allowed; in a production setting, this would be restricted via authentication.

---

## 📊 Analytics & Insights

The admin dashboard includes lightweight but meaningful analytics:
- Total review count
- Rating distribution (1★–5★) with progress-style bars
- Sentiment breakdown (positive / neutral / negative)
- AI-generated high-level insights based on recent feedback

These features were added to reflect how internal teams might realistically consume feedback data.

---

## 🧪 Error Handling & Edge Cases

- Input validation for rating and review text
- Limits on review length
- Graceful handling of LLM parsing failures
- Structured JSON responses from all backend APIs

---

## 📝 Notes

- The system prioritizes clarity, robustness, and realistic product behavior
- Emphasis was placed on clean architecture and reliability rather than over-engineering
- Both dashboards are fully deployed and publicly accessible

---

## 📂 Related Work

- **Task 1:** Prompt-based Yelp rating prediction (included separately in the repository)
