"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePost() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState("5"); // Default user id 5 thakbe
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch("https://dummyjson.com/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          body,
          userId: Number(userId),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // Success Message
      setMessage({
        type: "success",
        text: "Post created successfully! (Simulated by DummyJSON)",
      });
      console.log("DummyJSON Response:", data);

      // Form clear kora
      setTitle("");
      setBody("");

      // Direct Home page-e niye jabe click korar por
      router.push("/"); 
      
    } catch (error: any) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6 text-slate-800">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-xl md:p-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent md:text-3xl">
            Create a New Post
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Share your thoughts with the community.
          </p>
        </div>

        {/* Status Alerts */}
        {message.text && (
          <div
            className={`mb-6 rounded-xl p-4 text-sm font-medium border ${
              message.type === "success"
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-red-50 text-red-700 border-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* User ID Field */}
          <div>
            <label
              htmlFor="userId"
              className="block text-sm font-semibold text-slate-700"
            >
              User ID
            </label>
            <input
              id="userId"
              type="number"
              required
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="mt-2 block w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder-slate-400 shadow-sm transition-all duration-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              placeholder="e.g., 5"
            />
          </div>

          {/* Title Field */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-slate-700"
            >
              Post Title
            </label>
            <input
              id="title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 block w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder-slate-400 shadow-sm transition-all duration-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              placeholder="I am in love with someone..."
            />
          </div>

          {/* Body Field */}
          <div>
            <label
              htmlFor="body"
              className="block text-sm font-semibold text-slate-700"
            >
              Content
            </label>
            <textarea
              id="body"
              required
              rows={5}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="mt-2 block w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder-slate-400 shadow-sm transition-all duration-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none"
              placeholder="Write your story here..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-4 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:from-indigo-600 hover:to-purple-700 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <svg
                    className="mr-2 h-4 w-4 animate-spin text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Publishing...
                </>
              ) : (
                "Publish Post"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}