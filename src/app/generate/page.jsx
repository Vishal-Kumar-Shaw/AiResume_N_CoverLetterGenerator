"use client";
import { useState } from "react";

export default function GeneratePage() {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [resumes, setResumes] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jobTitle,
        company,
        description,
      }),
    });

    const data = await res.json();
    setResumes(data.resumes); // assuming this returns 5 alternatives
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow">
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <h2 className="text-xl font-semibold">Job Description Input</h2>
        <div className="flex space-x-4 text-sm">
          <a href="/generate" className="text-blue-600 hover:underline">Generate</a>
          <a href="/dashboard" className="text-blue-600 hover:underline">History</a>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Job title</label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Company</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Job description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2 h-28"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </form>

      {resumes.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Generated Resumes</h3>
          <ul className="space-y-4">
            {resumes.map((res, index) => (
              <li key={index} className="p-3 border rounded bg-gray-50">
                <pre className="whitespace-pre-wrap">{res}</pre>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
