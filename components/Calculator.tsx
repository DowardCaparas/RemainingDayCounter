"use client";

import { log } from "console";
import React, { ChangeEvent, useState } from "react";

const Hero = () => {
  const [remainingDays, setRemainingDays] = useState<number>(0);
  const [subscriptionValue, setSubscriptionValue] = useState<number>(30);

  const handleSubscriptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSubscriptionValue(parseInt(event.target.value, 10));
  };

  const reset = () => {
    const dateStartedInput = document.getElementById(
      "dateStarted"
    ) as HTMLInputElement;
    const dateReportedInput = document.getElementById(
      "dateReported"
    ) as HTMLInputElement;

    if (dateStartedInput) {
      dateStartedInput.value = ""; // Clear Date Started input
    }

    if (dateReportedInput) {
      dateReportedInput.value = ""; // Clear Date Reported input
    }

    setRemainingDays(0); // Reset remaining days state
  };

  const calculateRemainingDays = () => {
    const dateStartedInput = document.getElementById(
      "dateStarted"
    ) as HTMLInputElement;
    const dateReportedInput = document.getElementById(
      "dateReported"
    ) as HTMLInputElement;

    if (document) {
      const errorMessageElement = document.getElementById('error-message');
      if (errorMessageElement) {
        if (dateStartedInput && dateReportedInput) {
          const dateStarted = new Date(dateStartedInput.value);
          const dateReported = new Date(dateReportedInput.value);
    
          if (!isNaN(dateStarted.getTime()) && !isNaN(dateReported.getTime())) {
            const diffTime = Math.abs(dateReported.getTime() - dateStarted.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
            setRemainingDays(diffDays); // Assuming setRemainingDays accepts a string
            errorMessageElement.textContent = ''; // Clear any previous error message
          } else {
            errorMessageElement.textContent = "Invalid dates provided.";
          }
        }
      } else {
        console.error("Error: Element with id 'error-message' not found.");
      }
    }
    
  };

  return (
    <section className="flex flex-col justify-center items-center h-screen max-sm:p-5">
       <h1 className='text-center text-2xl mb-2 font-bold text-white'>Remaining Day Counter</h1>
      <div className="container max-w-md rounded-xl flex flex-col p-5 justify-center gap-2 ">
        <div className="flex items-center gap-4">
          {/* Days value */}
          <div>
            <p>Days:</p>
            <input
              type="text"
              id="days"
              value={subscriptionValue}
              className="bg-slate-200 rounded-full p-2 w-1/2 text-center"
              readOnly
            />
          </div>
          <div>
            <p>Subs:</p>

            {/* Subscription */}
            <select
              name="days"
              id="subscription"
              className="rounded-full p-3 cursor-pointer text-center w-40 bg-white"
              value={subscriptionValue}
              onChange={handleSubscriptionChange}
            >
              <option value="30">1 month</option>
              <option value="60">2 months</option>
              <option value="90">3 months</option>
              <option value="120">4 months</option>
              <option value="150">5 months</option>
            </select>
          </div>
        </div>

       <div className="mt-5">
          {/* Date Started */}
          <p>Date Started:</p>
          <input type="date" id="dateStarted" className="date_class" required />

          {/* Date Reported */}
          <p>Date Reported:</p>
          <input type="date" id="dateReported" className="date_class" required />
       </div>

        {/*Remaining days */}
        <h2>Remaining days: {subscriptionValue - remainingDays}</h2>

        {/* Day used */}
        <h2>Day used: {remainingDays}</h2>

        <div className="flex flex-col text-gray-900 gap-2 mt-8">

          <p id="error-message" className="text-red-500"></p>
          
          {/* Calculate Remaining days */}
          <button
            id="calcDays"
            className="bg-green-400 button_class"
            onClick={calculateRemainingDays}
          >
            Calculate
          </button>

          {/*Set value to default */}
          <button
            className="bg-red-400 button_class"
            onClick={reset}
          >
            Reset
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
