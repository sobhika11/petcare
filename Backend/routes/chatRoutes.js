const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required" });
    }
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: messages,
        temperature: 0.7,
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Groq API Error:", errorData);
      return res.status(response.status).json({ error: "Failed to communicate with Groq AI" });
    }

    const data = await response.json();
    const reply = data.choices[0]?.message?.content || "Sorry, I couldn't understand that.";
    
    res.json({ reply });
  } catch (error) {
    console.error("Error in chat route:", error);
    res.status(500).json({ error: "Server error during chat request" });
  }
});

module.exports = router;
