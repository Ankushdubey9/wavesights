import React from "react";

export default function Support() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-8 text-cyan-400">
          Support Center
        </h1>

        <p className="text-gray-300 mb-8">
          Need help? We're here to assist you.
        </p>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Contact Support
          </h2>

          <p className="text-gray-300">
            Email: wavesights.ai@gmail.com
          </p>

          <p className="text-gray-300 mt-2">
            Response Time: Within 24–48 hours
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">
            Common Support Topics
          </h2>

          <ul className="list-disc ml-6 space-y-2 text-gray-300">
            <li>Login & Account Issues</li>
            <li>Career Roadmap Generation</li>
            <li>Resume Analysis</li>
            <li>Feature Requests</li>
          </ul>
        </div>
      </div>
    </div>
  );
}