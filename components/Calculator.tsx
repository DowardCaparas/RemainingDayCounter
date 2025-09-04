"use client";

import React, { ChangeEvent, useState } from "react";

const Hero = () => {
  const [remainingDays, setRemainingDays] = useState<number>(0);
  const [subscriptionValue, setSubscriptionValue] = useState<number>(30);

  const handleSubscriptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSubscriptionValue(parseInt(event.target.value, 10));
  };

  const reset = () => {
    const dateStartedInput = document.getElementById("dateStarted") as HTMLInputElement;
    const dateReportedInput = document.getElementById("dateReported") as HTMLInputElement;

    if (dateStartedInput) dateStartedInput.value = "";
    if (dateReportedInput) dateReportedInput.value = "";

    setRemainingDays(0);
  };

  const calculateRemainingDays = () => {
    const dateStartedInput = document.getElementById("dateStarted") as HTMLInputElement;
    const dateReportedInput = document.getElementById("dateReported") as HTMLInputElement;
    const errorMessageElement = document.getElementById("error-message");

    if (dateStartedInput && dateReportedInput && errorMessageElement) {
      const dateStarted = new Date(dateStartedInput.value);
      const dateReported = new Date(dateReportedInput.value);

      if (!isNaN(dateStarted.getTime()) && !isNaN(dateReported.getTime())) {
        const diffTime = Math.abs(dateReported.getTime() - dateStarted.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setRemainingDays(diffDays);
        errorMessageElement.textContent = "";
      } else {
        errorMessageElement.textContent = "Invalid dates provided.";
      }
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 to-purple-600 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">📅 Remaining Day Counter</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Days</label>
            <input
              type="text"
              id="days"
              value={subscriptionValue}
              readOnly
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-center bg-gray-100 text-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Subscription</label>
            <select
              id="subscription"
              value={subscriptionValue}
              onChange={handleSubscriptionChange}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 bg-white text-gray-700"
            >
              <option value="30">1 month</option>
              <option value="60">2 months</option>
              <option value="90">3 months</option>
              <option value="120">4 months</option>
              <option value="150">5 months</option>
              <option value="180">6 months</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date Started</label>
            <input
              type="date"
              id="dateStarted"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date Reported</label>
            <input
              type="date"
              id="dateReported"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700"
              required
            />
          </div>
        </div>

        <div className="text-center space-y-2">
          <p className="text-lg font-semibold text-gray-800">Remaining Days: {subscriptionValue - remainingDays}</p>
          <p className="text-lg font-semibold text-gray-800">Days Used: {remainingDays}</p>
        </div>

        <p id="error-message" className="text-center text-red-500 text-sm"></p>

        <div className="flex justify-between gap-4">
          <button
            onClick={calculateRemainingDays}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Calculate
          </button>
          <button
            onClick={reset}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Reset
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;