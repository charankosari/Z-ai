"use client";

import { useState, useEffect } from "react";

export default function CustomInstructions() {
  const [instructions, setInstructions] = useState("");
  const [newInstructions, setNewInstructions] = useState("");

  // Fetch current instructions from backend (if needed)
  useEffect(() => {
    fetch("http://127.0.0.1:5000/custominstructions")
      .then((res) => res.json())
      .then((data) => setInstructions(data.instructions))
      .catch((err) => console.error("Error fetching instructions:", err));
  }, []);

  // Update instructions in Flask backend
  const updateInstructions = async () => {
    const response = await fetch("http://127.0.0.1:5000/custominstructions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ instructions: newInstructions }),
    });

    if (response.ok) {
      const result = await response.json();
      setInstructions(result.instructions);
      setNewInstructions("");
      alert("Instructions updated successfully!");
    } else {
      alert("Failed to update instructions.");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Custom Instructions</h1>

      <p className="mb-4">
        <strong>Current Instructions:</strong> {instructions}
      </p>

      <textarea
        className="w-full p-2 border rounded mb-2"
        rows={4}
        placeholder="Enter new instructions..."
        value={newInstructions}
        onChange={(e) => setNewInstructions(e.target.value)}
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={updateInstructions}
      >
        Update Instructions
      </button>
    </div>
  );
}
