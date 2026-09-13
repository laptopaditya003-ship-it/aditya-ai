const express = require("express");
const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(express.json());
app.use(express.static("."));

app.post("/ask", async (req, res) => {
  const question = req.body.question || "";
  const lower = question.toLowerCase();

  if (lower.includes("aditya")) {
    return res.json({
      answer: "Welcome to the Unwanted AI chatbot And Please (don't) Visit Again!!",
      warning: true
    });
  }

  if (lower.includes("who are you")) {
    return res.json({
      answer: "Tell who you are, Girl or Boy."
    });
  }

  if (lower === "boy") {
    return res.json({
      answer: "So I have to give a meaningful sentence, OK then I am an AI assistant developed by Aditya Sir. I can answer questions, explain lessons, solve problems, help with coding, and help you with many other tasks."
    });
  }

  if (lower.includes("who built you")) {
    return res.json({
      answer: "I was built by a great personality, Aditya Singh in the year 2026."
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: question
    });

    res.json({
      answer: response.text
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      answer: "Sorry, I could not answer that. Please try again."
    });
  }
});

app.listen(3000,"0.0.0.0", () => {
  console.log("AI chatbot running at http://localhost:3000");
});